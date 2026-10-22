export type PartnerHospital = {
  slug: string;
  name: string;
  city: string;
  cityRu: string;
  cityUz: string;
  established: string;
  beds: string;
  image: string;
  accreditation: string;
  summaryKey: "apollo" | "fortis" | "max" | "aiims";
};

/**
 * Partner hospitals — facts verified from public sources (Wikipedia, official data).
 * Photos are free-licensed (Wikimedia Commons), see photo credits in the footer.
 */
export const hospitals: PartnerHospital[] = [
  {
    slug: "indraprastha-apollo-delhi",
    name: "Indraprastha Apollo Hospitals",
    city: "New Delhi",
    cityRu: "Нью-Дели",
    cityUz: "Yangi Dehli",
    established: "1995",
    beds: "695",
    image: "/images/hospitals/apollo-delhi.jpg",
    accreditation: "JCI · NABH",
    summaryKey: "apollo",
  },
  {
    slug: "fortis-hospital-noida",
    name: "Fortis Hospital, Noida",
    city: "Delhi NCR",
    cityRu: "Нойда, Дели NCR",
    cityUz: "Noyda, Dehli NCR",
    established: "2004",
    beds: "400+",
    image: "/images/hospitals/fortis-noida.jpg",
    accreditation: "NABH · NABL",
    summaryKey: "fortis",
  },
  {
    slug: "max-super-speciality-delhi",
    name: "Max Super Speciality Hospital, Saket",
    city: "New Delhi",
    cityRu: "Нью-Дели",
    cityUz: "Yangi Dehli",
    established: "2006",
    beds: "539",
    image: "/images/hospitals/max-delhi.jpg",
    accreditation: "JCI · NABH",
    summaryKey: "max",
  },
  {
    slug: "aiims-new-delhi",
    name: "AIIMS New Delhi",
    city: "New Delhi",
    cityRu: "Нью-Дели",
    cityUz: "Yangi Dehli",
    established: "1956",
    beds: "3 600+",
    image: "/images/hospitals/aiims-delhi.jpg",
    accreditation: "Government of India",
    summaryKey: "aiims",
  },
];

export type FeaturedDoctor = {
  slug: string;
  name: string;
  role: string;
  roleRu: string;
  roleUz: string;
  hospital: string;
  image: string;
  factsKey: "trehan" | "panda";
};

/** World-renowned Indian surgeons — facts from public sources (Wikipedia). */
export const doctors: FeaturedDoctor[] = [
  {
    slug: "dr-naresh-trehan",
    name: "Dr. Naresh Trehan",
    role: "Cardiothoracic & cardiovascular surgeon",
    roleRu: "Сердечно-сосудистый и торакальный хирург",
    roleUz: "Yurak-qon tomir va torakal jarroh",
    hospital: "Medanta – The Medicity, Gurugram",
    image: "/images/doctors/dr-naresh-trehan.jpg",
    factsKey: "trehan",
  },
  {
    slug: "dr-ramakanta-panda",
    name: "Dr. Ramakanta Panda",
    role: "Cardiac surgeon, Chairman of Asian Heart Institute",
    roleRu: "Кардиохирург, председатель Asian Heart Institute",
    roleUz: "Kardijarroh, Asian Heart Institute raisi",
    hospital: "Asian Heart Institute, Mumbai",
    image: "/images/doctors/dr-ramakanta-panda.jpg",
    factsKey: "panda",
  },
];
