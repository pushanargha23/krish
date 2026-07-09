import Papa from 'papaparse';
import type { Property, PropertyType, PropertyStatus } from '../types';

const STORAGE_KEY = 'uploaded_properties_csv_data';

// Basic helper to generate slugs
const generateSlug = (text: string) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

export const parseAndSaveCSV = (csvData: string): Promise<Property[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const properties: Property[] = results.data.map((row: any, index: number) => {
            // Parse images
            const rawImages = row['Drive Link / Photos'] || '';
            let imageUrls = rawImages.split(',').map((u: string) => u.trim()).filter(Boolean);
            
            // Helper to convert Google Drive view links to direct image links
            imageUrls = imageUrls.map((url: string) => {
              // If the user pastes a folder link by mistake, we cannot use it as an image
              if (url.includes('/folders/')) {
                console.error(`🚨 ERROR: You pasted a Google Drive FOLDER link (${url}). Websites cannot display folders as images. You must paste the direct link to the specific IMAGE file.`);
                // Return a special placeholder that says "Folder Link Not Supported"
                return 'https://placehold.co/800x600/ef4444/ffffff?text=Error:+Folder+Link+Provided.+Please+use+Image+File+Links.';
              }
              
              const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
              if (match && match[1]) {
                // Using lh3.googleusercontent.com/d/ endpoint is the most reliable way 
                // to embed Google Drive images in <img> tags without hitting 403 or 302 redirects.
                return `https://lh3.googleusercontent.com/d/${match[1]}`;
              }
              return url;
            });

            // Fallback image if none provided
            if (imageUrls.length === 0) {
              imageUrls.push('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800');
            }

            const images = imageUrls.map((url: string, i: number) => ({
              url,
              publicId: `img_${index}_${i}`,
              alt: `${row['Property Name'] || 'Property'} Image ${i + 1}`,
              isPrimary: i === 0
            }));

            // Extract bedrooms/bathrooms from Configurations or defaults
            const config = (row['Configurations'] || '').toLowerCase();
            let bedrooms = 1;
            const bedMatch = config.match(/(\d+)\s*(bhk|bed)/);
            if (bedMatch) {
              bedrooms = parseInt(bedMatch[1], 10);
            }
            const bathrooms = bedrooms; // Rough default

            // Clean up Price
            const priceRaw = (row['Price'] || '0').replace(/[^\d.]/g, '');
            const price = parseFloat(priceRaw) || 0;

            // Clean up Area
            const areaRaw = (row['Unit Area'] || '0').replace(/[^\d.]/g, '');
            const area = parseFloat(areaRaw) || 0;

            // Extract Location info (fallback to splitting string if comma separated)
            const locationParts = (row['Location'] || '').split(',').map((s: string) => s.trim());
            const city = locationParts.length > 1 ? locationParts[locationParts.length - 1] : locationParts[0] || 'Unknown';
            const address = locationParts[0] || 'Unknown';

            const prop: Property = {
              _id: `prop_sheet_${index}`,
              title: row['Property Name'] || 'Untitled Property',
              slug: generateSlug(row['Property Name'] || `property-${index}`),
              description: row['About this property'] || 'No description available.',
              price: price,
              priceUnit: 'total',
              type: ((row['Type'] || 'apartment').toLowerCase() as PropertyType) || 'apartment',
              status: ((row['Status'] || 'available').toLowerCase() as PropertyStatus) || 'available',
              bedrooms: bedrooms,
              bathrooms: bathrooms,
              area: area,
              areaUnit: 'sqft',
              possession: row['Possession status'] || 'Ready to Move',
              location: {
                address: address,
                city: city,
                state: '',
                pincode: '',
                lat: 19.076,
                lng: 72.877
              },
              builder: {
                _id: 'builder_sheet',
                name: row['Owner'] || 'Owner',
                slug: generateSlug(row['Owner'] || 'Owner'),
                logo: '',
                description: 'Property Owner/Builder',
                established: 2000,
                totalProjects: 1,
                deliveredProjects: 1,
                rating: 4.5,
                isVerified: true
              },
              images,
              amenities: (row['Amenities'] || '').split(',').map((s: string) => s.trim()).filter(Boolean),
              highlights: (row['Specifications'] || '').split(',').map((s: string) => s.trim()).filter(Boolean),
              isFeatured: (row['Available Facilities'] || '').toLowerCase().includes('featured') || !!row['Featured Level'],
              featuredLevel: (parseInt(row['Featured Level'] || '0') === 1 ? 1 : (parseInt(row['Featured Level'] || '0') === 2 ? 2 : undefined)),
              isNew: true,
              isVerified: true,
              views: Math.floor(Math.random() * 500) + 50,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };

            return prop;
          });

          // Filter out obviously empty rows
          const validProperties = properties.filter(p => p.title && p.title !== 'Untitled Property');
          
          // Save to localStorage
          localStorage.setItem(STORAGE_KEY, JSON.stringify(validProperties));
          resolve(validProperties);
        } catch (e) {
          reject(e);
        }
      },
      error: (error: any) => {
        reject(error);
      }
    });
  });
};

export const getProperties = async (): Promise<Property[]> => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    try {
      const parsed = JSON.parse(storedData) as Property[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse properties from localStorage', e);
    }
  }

  // Fallback to empty array if nothing in localStorage
  return [];
};
