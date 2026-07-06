# Firebase Migration Guide

## Overview
Your Krishhiv Realtors project has been successfully migrated from a Node.js backend to Firebase. The backend server folder has been removed, and all backend functionality now uses Firebase services.

## Firebase Services Used

### 1. **Firebase Authentication**
- User registration and login
- Password reset functionality
- User session management
- Located in: `src/context/AuthContext.tsx`

### 2. **Firestore Database**
- Properties collection
- Users collection
- Leads collection
- Appointments collection
- Blogs collection
- Testimonials collection
- Builders collection
- FAQs collection
- Gallery collection
- Careers collection
- Contact submissions collection
- Newsletter subscribers collection

### 3. **Firebase Storage**
- Image and file uploads (optional)
- Located in: `src/config/firebase.ts`

## Setup Instructions

### Step 1: Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a new project"
3. Name it "Krisshiv Realtors"
4. Choose your region
5. Enable Google Analytics (optional)

### Step 2: Get Firebase Configuration
1. In Firebase Console, go to Project Settings
2. Under "Your apps", click on the Web app icon (</>)
3. Register your app
4. Copy the Firebase configuration object

### Step 3: Set Environment Variables
1. A `.env.local` file has been created in the `client` folder with your Firebase configuration
2. The environment variables are ready to use:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Step 4: Enable Firebase Services

#### Authentication
1. Go to Authentication section
2. Click "Get Started"
3. Enable "Email/Password" provider
4. (Optional) Enable Google, Facebook, etc.

#### Firestore Database
1. Go to Firestore Database
2. Click "Create Database"
3. Start in **Production Mode** (security rules required)
4. Choose your location

#### Create Firestore Collections

**Sample Structure:**

```
properties/
  - id (auto-generated)
  - title
  - slug
  - description
  - price
  - location
  - city
  - type
  - bedrooms
  - bathrooms
  - area
  - images []
  - featured (boolean)
  - views (number)
  - createdAt

users/
  - _id (same as Firebase UID)
  - name
  - email
  - phone
  - role
  - avatar
  - wishlist []
  - refreshToken (optional)
  - createdAt

leads/
  - id
  - name
  - email
  - phone
  - message
  - propertyId
  - source
  - status
  - createdAt

appointments/
  - id
  - name
  - email
  - phone
  - propertyId
  - date
  - time
  - type
  - status
  - createdAt

blogs/
  - id
  - title
  - slug
  - content
  - category
  - image
  - author
  - createdAt

testimonials/
  - id
  - name
  - text
  - rating
  - property

builders/
  - id
  - name
  - slug
  - description
  - logo
  - website

faqs/
  - id
  - question
  - answer
  - category

contact-submissions/
  - id
  - name
  - email
  - phone
  - subject
  - message
  - createdAt

newsletter-subscribers/
  - id
  - email
  - createdAt
```

### Step 5: Set Firestore Security Rules

Replace the default security rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access for properties, blogs, testimonials, etc.
    match /{document=**} {
      allow read: if true;
    }
    
    // Users can write their own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Leads collection - allow anyone to write
    match /leads/{document=**} {
      allow write: if true;
      allow read: if request.auth != null;
    }
    
    // Appointments - allow authenticated users to write
    match /appointments/{document=**} {
      allow write: if request.auth != null;
      allow read: if request.auth != null;
    }
    
    // Contact submissions - allow anyone to write
    match /contact-submissions/{document=**} {
      allow write: if true;
    }
    
    // Newsletter - allow anyone to subscribe
    match /newsletter-subscribers/{document=**} {
      allow write: if true;
    }
  }
}
```

## File Structure Changes

### Removed
- `server/` folder - entire backend removed
- All Node.js backend files

### Added/Modified
- `src/config/firebase.ts` - Firebase configuration
- `src/api/services.ts` - Updated to use Firestore instead of HTTP calls
- `src/context/AuthContext.tsx` - Now uses Firebase Authentication
- `.env.example` - Added Firebase configuration variables

## API Service Changes

All API calls have been converted from HTTP requests to Firestore queries:

### Before (HTTP)
```typescript
const response = await api.get('/properties');
```

### After (Firebase)
```typescript
const response = await propertyService.getAll(filters);
```

The response structure remains similar for compatibility with existing code.

## Running the Application

1. Install dependencies:
```bash
cd client
npm install
```

2. Create `.env.local` with your Firebase credentials

3. Start development server:
```bash
npm run dev
```

## Important Notes

1. **Security**: Never commit your `.env.local` file with real Firebase credentials
2. **Firestore**: Charges apply for read/write operations. Monitor your usage
3. **Authentication**: Firebase provides free authentication for unlimited users
4. **Storage**: Use Firebase Storage for file uploads (optional setup in `src/config/firebase.ts`)
5. **Database**: Start with a small set of sample data for testing

## Migrating Existing Data

If you have existing data from the Node.js backend:

1. Export data from MongoDB/SQL as JSON
2. Use Firebase Console's "Import/Export" feature, OR
3. Write a migration script using the Firebase Admin SDK

## Troubleshooting

### CORS Issues
If you see CORS errors, ensure your Firebase project allows requests from your domain in the Firestore rules.

### Authentication Errors
- Check that Email/Password provider is enabled
- Verify environment variables are set correctly
- Clear browser cache and localStorage

### Firestore Queries Not Working
- Ensure collections are created with correct names
- Check Firestore security rules
- Verify document structure matches expected format

## Next Steps

1. Set up your Firebase project
2. Create Firestore collections with sample data
3. Configure security rules
4. Test authentication flow
5. Verify data operations work correctly
6. Deploy to Firebase Hosting (optional)

## Support

For Firebase documentation, visit: https://firebase.google.com/docs
