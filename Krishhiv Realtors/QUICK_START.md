# Quick Start - Firebase Migration

## What Changed?
- **Removed**: `server/` folder (Node.js backend)
- **Added**: Firebase integration for all backend functionality
- **Updated**: All API calls now use Firestore

## Quick Setup (5 minutes)

### 1. Create Firebase Project
Visit https://console.firebase.google.com and create a new project

### 2. Get Config
In Firebase Console → Project Settings → Your Apps → Web App
Copy the configuration

### 3. Create `.env.local` in `client/` folder
```env
VITE_FIREBASE_API_KEY=abc123...
VITE_FIREBASE_AUTH_DOMAIN=projectname.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=projectname
VITE_FIREBASE_STORAGE_BUCKET=projectname.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123...
```

### 4. Enable Services
- Authentication → Email/Password
- Firestore Database → Create Database
- Copy/Paste security rules from FIREBASE_SETUP.md

### 5. Create Collections
Open Firestore Console and create these collections:
- properties
- users
- leads
- appointments
- blogs
- testimonials
- builders
- faqs
- gallery
- careers
- contact-submissions
- newsletter-subscribers

### 6. Run
```bash
cd client
npm install  # Already done
npm run dev
```

## File Locations

| What | Where |
|------|-------|
| Firebase Config | `src/config/firebase.ts` |
| Auth Logic | `src/context/AuthContext.tsx` |
| API Services | `src/api/services.ts` |
| Setup Guide | `FIREBASE_SETUP.md` |

## Common Tasks

### Add a Property to Firestore
```typescript
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const propertiesRef = collection(db, 'properties');
await addDoc(propertiesRef, {
  title: 'Luxury Apartment',
  price: 5000000,
  city: 'Mumbai',
  createdAt: serverTimestamp(),
});
```

### Query Properties
```typescript
import { propertyService } from '../api/services';

const response = await propertyService.getAll({ city: 'Mumbai' });
const properties = response.data.data;
```

### Login User
```typescript
import { useAuth } from '../context/AuthContext';

const { login } = useAuth();
await login('user@example.com', 'password123');
```

## Important Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;  // Public read
    }
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;  // Own data only
    }
    match /leads/{document=**} {
      allow write: if true;  // Anyone can submit leads
      allow read: if request.auth != null;
    }
  }
}
```

## Troubleshooting

**Error: "Firebase config not found"**
→ Check `.env.local` in `client/` folder

**Error: "Permission denied" in console**
→ Check Firestore security rules

**Can't login?**
→ Enable Email/Password in Firebase Authentication

**Queries returning empty?**
→ Create collections in Firestore Console with same names

## Costs

| Service | Free Tier |
|---------|-----------|
| Authentication | Unlimited users |
| Firestore | 50k reads/day, 20k writes/day |
| Storage | 5GB |

See https://firebase.google.com/pricing for details.

## Next: Deploy to Firebase Hosting (Optional)

```bash
npm install -g firebase-tools
firebase login
firebase init
npm run build
firebase deploy
```

---
**Need help?** See `FIREBASE_SETUP.md` for detailed instructions
