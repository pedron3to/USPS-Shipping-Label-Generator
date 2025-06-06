# USPS Shipping Label Generator

A Next.js application that generates USPS shipping labels using the EasyPost API. This application allows users to input shipping details and generate printable USPS shipping labels.

## Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory with your EasyPost API key:
   ```
   NEXT_PUBLIC_EASYPOST_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- Address validation for US addresses
- Package dimension and weight input
- USPS shipping label generation
- Label preview and printing
- Responsive design

## Assumptions & Design Decisions

1. **Address Validation**: Only US addresses are accepted as per requirements
2. **Package Types**: Focused on common package types (First-Class, Priority Mail)
3. **UI/UX**: Simple, intuitive form-based interface with clear validation
4. **Security**: API key is stored in environment variables
5. **Error Handling**: Comprehensive error messages for API failures

## What I'd Do Next

1. **Enhanced Features**:
   - Add support for international shipping
   - Implement address book for frequent recipients
   - Add shipping rate calculator
   - Support multiple package types and services

2. **Technical Improvements**:
   - Add comprehensive test coverage
   - Implement caching for API responses
   - Add loading states and better error handling
   - Implement proper logging
   - Add analytics for usage tracking

3. **UI/UX Improvements**:
   - Add dark mode support
   - Implement address autocomplete
   - Add shipping history
   - Improve mobile responsiveness
   - Add print preview customization

## Tech Stack

- Next.js 14+ (App Router)
- React + TypeScript
- EasyPost API
- Tailwind CSS
- React Hook Form + Zod for form handling
- Headless UI for accessible components

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🏷️ Example Addresses

You can use the following sample US addresses to test the form:

```json
{
  "name": "Jane Doe",
  "street1": "456 Broadway",
  "street2": "Apt 7B",
  "city": "New York",
  "state": "NY",
  "zip": "10013",
  "country": "US"
}
```
```json
{
  "name": "Pedro",
  "street1": "47 W 13th St",
  "street2": "Unit 302",
  "city": "New York",
  "state": "NY",
  "zip": "10011",
  "country": "US"
}
```

Both addresses are valid for USPS and EasyPost test label generation.

**You can copy and paste these into the "From Address" and "To Address" fields to quickly test the app.**

Let me know if you want this in a different format or want to add more test data!
