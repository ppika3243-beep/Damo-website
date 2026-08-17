export interface DistrictOption {
  name: string;
  division: string;
  isPopular?: boolean;
}

export const BANGLADESH_DISTRICTS: DistrictOption[] = [
  // Dhaka Division
  { name: 'Dhaka', division: 'Dhaka', isPopular: true },
  { name: 'Gazipur', division: 'Dhaka', isPopular: true },
  { name: 'Narayanganj', division: 'Dhaka', isPopular: true },
  { name: 'Tangail', division: 'Dhaka' },
  { name: 'Faridpur', division: 'Dhaka' },
  { name: 'Manikganj', division: 'Dhaka' },
  { name: 'Munshiganj', division: 'Dhaka' },
  { name: 'Narsingdi', division: 'Dhaka' },
  { name: 'Gopalganj', division: 'Dhaka' },
  { name: 'Kishoreganj', division: 'Dhaka' },
  { name: 'Madaripur', division: 'Dhaka' },
  { name: 'Rajbari', division: 'Dhaka' },
  { name: 'Shariatpur', division: 'Dhaka' },

  // Chittagong Division
  { name: 'Chattogram (Chittagong)', division: 'Chattogram', isPopular: true },
  { name: "Cox's Bazar", division: 'Chattogram', isPopular: true },
  { name: 'Cumilla (Comilla)', division: 'Chattogram', isPopular: true },
  { name: 'Feni', division: 'Chattogram' },
  { name: 'Brahmanbaria', division: 'Chattogram' },
  { name: 'Noakhali', division: 'Chattogram' },
  { name: 'Chandpur', division: 'Chattogram' },
  { name: 'Lakshmipur', division: 'Chattogram' },
  { name: 'Bandarban', division: 'Chattogram' },
  { name: 'Rangamati', division: 'Chattogram' },
  { name: 'Khagrachhari', division: 'Chattogram' },

  // Sylhet Division
  { name: 'Sylhet', division: 'Sylhet', isPopular: true },
  { name: 'Moulvibazar', division: 'Sylhet' },
  { name: 'Habiganj', division: 'Sylhet' },
  { name: 'Sunamganj', division: 'Sylhet' },

  // Rajshahi Division
  { name: 'Rajshahi', division: 'Rajshahi', isPopular: true },
  { name: 'Bogura (Bogra)', division: 'Rajshahi', isPopular: true },
  { name: 'Pabna', division: 'Rajshahi' },
  { name: 'Sirajganj', division: 'Rajshahi' },
  { name: 'Naogaon', division: 'Rajshahi' },
  { name: 'Natore', division: 'Rajshahi' },
  { name: 'Chapai Nawabganj', division: 'Rajshahi' },
  { name: 'Joypurhat', division: 'Rajshahi' },

  // Khulna Division
  { name: 'Khulna', division: 'Khulna', isPopular: true },
  { name: 'Jashore (Jessore)', division: 'Khulna', isPopular: true },
  { name: 'Kushtia', division: 'Khulna' },
  { name: 'Satkhira', division: 'Khulna' },
  { name: 'Jhenaidah', division: 'Khulna' },
  { name: 'Bagerhat', division: 'Khulna' },
  { name: 'Chuadanga', division: 'Khulna' },
  { name: 'Magura', division: 'Khulna' },
  { name: 'Meherpur', division: 'Khulna' },
  { name: 'Narail', division: 'Khulna' },

  // Barisal Division
  { name: 'Barishal (Barisal)', division: 'Barishal', isPopular: true },
  { name: 'Patuakhali', division: 'Barishal' },
  { name: 'Bhola', division: 'Barishal' },
  { name: 'Pirojpur', division: 'Barishal' },
  { name: 'Barguna', division: 'Barishal' },
  { name: 'Jhalokati', division: 'Barishal' },

  // Rangpur Division
  { name: 'Rangpur', division: 'Rangpur', isPopular: true },
  { name: 'Dinajpur', division: 'Rangpur' },
  { name: 'Gaibandha', division: 'Rangpur' },
  { name: 'Kurigram', division: 'Rangpur' },
  { name: 'Lalmonirhat', division: 'Rangpur' },
  { name: 'Nilphamari', division: 'Rangpur' },
  { name: 'Panchagarh', division: 'Rangpur' },
  { name: 'Thakurgaon', division: 'Rangpur' },

  // Mymensingh Division
  { name: 'Mymensingh', division: 'Mymensingh', isPopular: true },
  { name: 'Jamalpur', division: 'Mymensingh' },
  { name: 'Netrokona', division: 'Mymensingh' },
  { name: 'Sherpur', division: 'Mymensingh' },
];
