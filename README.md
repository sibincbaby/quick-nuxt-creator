# Artisan's Canvas - Artist Portfolio Website

A modern, responsive portfolio website for artists to showcase their work and connect with potential buyers through WhatsApp integration.

## Features

- **Artwork Gallery**: Browse and view detailed artwork information
- **WhatsApp Integration**: Direct contact for inquiries and purchases
- **Artist Contact Page**: Professional contact information and social media links
- **Responsive Design**: Works perfectly on mobile and desktop
- **Sanity CMS Integration**: Easy content management

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Routing**: React Router DOM
- **UI Components**: Radix UI with custom styling
- **CMS**: Sanity.io for content management
- **Build Tool**: Vite
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Sanity.io account (for CMS)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Create a .env file in the root directory
   VITE_SANITY_PROJECT_ID=your_sanity_project_id
   VITE_SANITY_DATASET=production
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Sanity CMS Setup

### Required Schemas

Create the following schemas in your Sanity Studio:

#### 1. Artwork Schema (`artwork.js`)

```javascript
export default {
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      validation: Rule => Rule.required().max(200)
    },
    {
      name: 'longDescription',
      title: 'Detailed Description',
      type: 'text'
    },
    {
      name: 'price',
      title: 'Price (in local currency)',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'images',
      title: 'Additional Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      options: {
        layout: 'grid'
      }
    },
    {
      name: 'dimensions',
      title: 'Dimensions',
      type: 'object',
      fields: [
        {name: 'width', title: 'Width', type: 'number'},
        {name: 'height', title: 'Height', type: 'number'},
        {
          name: 'unit',
          title: 'Unit',
          type: 'string',
          options: {
            list: [
              {title: 'Centimeters', value: 'cm'},
              {title: 'Inches', value: 'in'}
            ]
          }
        }
      ]
    },
    {
      name: 'medium',
      title: 'Medium',
      type: 'string',
      options: {
        list: [
          'Oil on Canvas',
          'Acrylic on Canvas',
          'Watercolor',
          'Mixed Media',
          'Digital Art',
          'Sculpture',
          'Photography'
        ]
      }
    },
    {
      name: 'year',
      title: 'Year Created',
      type: 'number',
      validation: Rule => Rule.required().min(1900).max(new Date().getFullYear())
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          'Abstract',
          'Portrait',
          'Landscape',
          'Still Life',
          'Contemporary',
          'Modern',
          'Traditional'
        ]
      }
    },
    {
      name: 'availability',
      title: 'Availability',
      type: 'string',
      options: {
        list: [
          {title: 'Available', value: 'available'},
          {title: 'Sold', value: 'sold'},
          {title: 'Reserved', value: 'reserved'}
        ]
      },
      initialValue: 'available'
    },
    {
      name: 'featured',
      title: 'Featured Artwork',
      type: 'boolean',
      description: 'Show this artwork on the homepage',
      initialValue: false
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      price: 'price'
    },
    prepare(selection) {
      const {title, media, price} = selection
      return {
        title: title,
        subtitle: price ? `₹${price}` : 'No price set',
        media: media
      }
    }
  }
}
```

#### 2. Artist Profile Schema (`artistProfile.js`)

```javascript
export default {
  name: 'artistProfile',
  title: 'Artist Profile',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Artist Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'address',
      title: 'Studio Address',
      type: 'text'
    },
    {
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {name: 'instagram', title: 'Instagram URL', type: 'url'},
        {name: 'facebook', title: 'Facebook URL', type: 'url'},
        {name: 'twitter', title: 'Twitter URL', type: 'url'},
        {name: 'linkedin', title: 'LinkedIn URL', type: 'url'}
      ]
    },
    {
      name: 'artistStatement',
      title: 'Artist Statement',
      type: 'text'
    },
    {
      name: 'workingHours',
      title: 'Studio Working Hours',
      type: 'text',
      description: 'Enter working hours (supports line breaks)'
    }
  ]
}
```

#### 3. Site Settings Schema (`siteSettings.js`)

```javascript
export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Include country code (e.g., +1234567890)',
      validation: Rule => Rule.required()
    },
    {
      name: 'businessHours',
      title: 'Business Hours',
      type: 'text'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {name: 'address', title: 'Address', type: 'string'},
        {name: 'city', title: 'City', type: 'string'},
        {name: 'country', title: 'Country', type: 'string'},
        {
          name: 'coordinates',
          title: 'Coordinates',
          type: 'object',
          fields: [
            {name: 'lat', title: 'Latitude', type: 'number'},
            {name: 'lng', title: 'Longitude', type: 'number'}
          ]
        }
      ]
    },
    {
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {name: 'instagram', title: 'Instagram URL', type: 'url'},
        {name: 'facebook', title: 'Facebook URL', type: 'url'},
        {name: 'twitter', title: 'Twitter URL', type: 'url'},
        {name: 'linkedin', title: 'LinkedIn URL', type: 'url'}
      ]
    }
  ]
}
```

## WhatsApp Integration

The website includes automatic WhatsApp integration for:

- **Artwork Inquiries**: Pre-filled messages with artwork details
- **Purchase Requests**: Direct purchase communication
- **General Contact**: Easy access to artist communication

### Message Templates

- **Inquiry**: "Hi! I'm interested in the artwork '[Title]' priced at [Price]. Could you please provide more details?"
- **Purchase**: "Hello! I would like to purchase the artwork '[Title]' priced at [Price]. Please let me know the next steps."
- **General**: "Hello! I'm interested in your artwork. Could we discuss your available pieces?"

## Navigation Structure

- **Home**: Featured artworks and artist introduction
- **Shop**: Complete artwork gallery with search and filters
- **Contact**: Artist information, contact methods, and social media

## Deployment

The website can be deployed to any static hosting service:

- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**

### Environment Variables for Production

```bash
VITE_SANITY_PROJECT_ID=your_sanity_project_id
VITE_SANITY_DATASET=production
```

## License

This project is proprietary and confidential. All rights reserved.