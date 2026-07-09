import Papa from 'papaparse';
import type { Property, PropertyType, PropertyStatus } from '../types';

const GOOGLE_SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/1JF8ybGiS8ouHv2v58kZMdglsE42X3mjfqVQEqsOqfyk/export?format=csv';

let cachedProperties: Property[] | null = null;
let isFetching = false;

// Basic helper to generate slugs
const generateSlug = (text: string) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

export const fetchPropertiesFromSheet = async (): Promise<Property[]> => {
  if (cachedProperties) {
    return cachedProperties;
  }
  
  if (isFetching) {
    // Basic polling to wait if already fetching
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if (cachedProperties) {
          clearInterval(interval);
          resolve(cachedProperties);
        }
      }, 100);
    });
  }

  isFetching = true;

  try {
    const response = await fetch(GOOGLE_SHEETS_CSV_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const csvData = await response.text();

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
                const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
                if (match && match[1]) {
                  return `https://drive.google.com/uc?export=view&id=${match[1]}`;
                }
                return url;
              });

              // Fallback image if none provided
              if (imageUrls.length === 0) {
                // If they provided a folder link but no direct files, we just fallback
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
                isFeatured: (row['Available Facilities'] || '').toLowerCase().includes('featured'),
                isNew: true,
                isVerified: true,
                views: Math.floor(Math.random() * 500) + 50,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              };

              return prop;
            });

            // Filter out obviously empty rows
            cachedProperties = properties.filter(p => p.title && p.title !== 'Untitled Property');
            isFetching = false;
            resolve(cachedProperties);
          } catch (e) {
            isFetching = false;
            reject(e);
          }
        },
        error: (error: any) => {
          isFetching = false;
          reject(error);
        }
      });
    });
  } catch (error) {
    isFetching = false;
    throw error;
  }
};
