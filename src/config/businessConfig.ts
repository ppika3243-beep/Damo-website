export interface BusinessConfig {
  brandName: string;
  tagline: string;
  category: string;
  phone: string;
  displayPhone: string;
  whatsappNumber: string;
  email: string;
  location: {
    street: string;
    area: string;
    city: string;
    country: string;
    fullAddress: string;
    googleMapsEmbedUrl?: string;
  };
  social: {
    facebook: string;
    instagram: string;
    whatsapp: string;
    tiktok?: string;
  };
  delivery: {
    insideDhakaCharge: number;
    dhakaSuburbsCharge: number;
    outsideDhakaCharge: number;
    estimatedInsideDhaka: string;
    estimatedDhakaSuburbs: string;
    estimatedOutsideDhaka: string;
    freeDeliveryThreshold: number; // e.g. ৳3000
  };
  payment: {
    bkashMerchantNumber: string;
    nagadMerchantNumber: string;
    codAvailable: boolean;
  };
  orderApiEndpoint: string;
}

export const businessConfig: BusinessConfig = {
  brandName: "Urban Thread BD",
  tagline: "Everyday style, made simple.",
  category: "Men's & Women's Fashion",
  phone: "+880 1712-345678",
  displayPhone: "+880 1712-345678",
  whatsappNumber: "8801712345678",
  email: "hello@urbanthreadbd.com",
  location: {
    street: "House 42, Road 11, Block D",
    area: "Banani",
    city: "Dhaka",
    country: "Bangladesh",
    fullAddress: "House 42, Road 11, Block D, Banani, Dhaka-1213, Bangladesh",
  },
  social: {
    facebook: "https://facebook.com/urbanthreadbd",
    instagram: "https://instagram.com/urbanthreadbd",
    whatsapp: "https://wa.me/8801712345678",
  },
  delivery: {
    insideDhakaCharge: 70,
    dhakaSuburbsCharge: 100,
    outsideDhakaCharge: 130,
    estimatedInsideDhaka: "24-48 hours",
    estimatedDhakaSuburbs: "2-3 business days",
    estimatedOutsideDhaka: "3-5 business days",
    freeDeliveryThreshold: 3500,
  },
  payment: {
    bkashMerchantNumber: "01712-345678 (Personal / Send Money or Merchant)",
    nagadMerchantNumber: "01712-345678 (Personal / Send Money)",
    codAvailable: true,
  },
  orderApiEndpoint: "https://script.google.com/macros/s/AKfycbyVAzeoR5R3m_1R3_KjdD8ITN5JzfBKSkwv6rgoX3B1V1PAXqua8Bq_wsZT6TzkgybY8g/exec",
};
