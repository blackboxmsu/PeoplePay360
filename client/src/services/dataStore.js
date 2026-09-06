// PeoplePay360 Centralized Data Store & State Manager
// Coordinates HR Configuration, Master Data, Operations, and Payroll
// Upgraded with full ~50 records per schema

const STORAGE_KEY = 'peoplepay360_master_data_v3';

// --- INITIAL MASTER SEED DATA ---

export const SEED_WORKING_SCHEDULES = [
  {
    "id": "ws-1",
    "name": "Standard 40 Hours",
    "calendarType": "Standard 5-Day",
    "company": "OxP Pvt Ltd",
    "status": "Active",
    "weeklyHours": 40,
    "daysPerWeek": 5,
    "notes": "Standard corporate 8-hour workday with 1-hour lunch break.",
    "days": [
      {
        "day": "Monday",
        "active": true,
        "startTime": "09:00",
        "endTime": "18:00",
        "breakHours": 1
      },
      {
        "day": "Tuesday",
        "active": true,
        "startTime": "09:00",
        "endTime": "18:00",
        "breakHours": 1
      },
      {
        "day": "Wednesday",
        "active": true,
        "startTime": "09:00",
        "endTime": "18:00",
        "breakHours": 1
      },
      {
        "day": "Thursday",
        "active": true,
        "startTime": "09:00",
        "endTime": "18:00",
        "breakHours": 1
      },
      {
        "day": "Friday",
        "active": true,
        "startTime": "09:00",
        "endTime": "18:00",
        "breakHours": 1
      },
      {
        "day": "Saturday",
        "active": false,
        "startTime": "09:00",
        "endTime": "14:00",
        "breakHours": 0
      },
      {
        "day": "Sunday",
        "active": false,
        "startTime": "00:00",
        "endTime": "00:00",
        "breakHours": 0
      }
    ]
  },
  {
    "id": "ws-2",
    "name": "Tech Flexible 35 Hours",
    "calendarType": "Flexible",
    "company": "OxP Pvt Ltd",
    "status": "Active",
    "weeklyHours": 35,
    "daysPerWeek": 5,
    "notes": "Engineering flexible schedule: 7 hours/day core window.",
    "days": [
      {
        "day": "Monday",
        "active": true,
        "startTime": "10:00",
        "endTime": "18:00",
        "breakHours": 1
      },
      {
        "day": "Tuesday",
        "active": true,
        "startTime": "10:00",
        "endTime": "18:00",
        "breakHours": 1
      },
      {
        "day": "Wednesday",
        "active": true,
        "startTime": "10:00",
        "endTime": "18:00",
        "breakHours": 1
      },
      {
        "day": "Thursday",
        "active": true,
        "startTime": "10:00",
        "endTime": "18:00",
        "breakHours": 1
      },
      {
        "day": "Friday",
        "active": true,
        "startTime": "10:00",
        "endTime": "18:00",
        "breakHours": 1
      },
      {
        "day": "Saturday",
        "active": false,
        "startTime": "00:00",
        "endTime": "00:00",
        "breakHours": 0
      },
      {
        "day": "Sunday",
        "active": false,
        "startTime": "00:00",
        "endTime": "00:00",
        "breakHours": 0
      }
    ]
  },
  {
    "id": "ws-3",
    "name": "Part-Time 20 Hours",
    "calendarType": "Part-Time",
    "company": "OxP Pvt Ltd",
    "status": "Active",
    "weeklyHours": 20,
    "daysPerWeek": 5,
    "notes": "Morning shift 4 hours/day for part-time specialists.",
    "days": [
      {
        "day": "Monday",
        "active": true,
        "startTime": "09:00",
        "endTime": "13:00",
        "breakHours": 0
      },
      {
        "day": "Tuesday",
        "active": true,
        "startTime": "09:00",
        "endTime": "13:00",
        "breakHours": 0
      },
      {
        "day": "Wednesday",
        "active": true,
        "startTime": "09:00",
        "endTime": "13:00",
        "breakHours": 0
      },
      {
        "day": "Thursday",
        "active": true,
        "startTime": "09:00",
        "endTime": "13:00",
        "breakHours": 0
      },
      {
        "day": "Friday",
        "active": true,
        "startTime": "09:00",
        "endTime": "13:00",
        "breakHours": 0
      },
      {
        "day": "Saturday",
        "active": false,
        "startTime": "00:00",
        "endTime": "00:00",
        "breakHours": 0
      },
      {
        "day": "Sunday",
        "active": false,
        "startTime": "00:00",
        "endTime": "00:00",
        "breakHours": 0
      }
    ]
  },
  {
    "id": "ws-4",
    "name": "Extended Support 45 Hours",
    "calendarType": "Support Shift",
    "company": "OxP Pvt Ltd",
    "status": "Active",
    "weeklyHours": 45,
    "daysPerWeek": 5,
    "notes": "Customer support schedule covering 9 hours daily.",
    "days": [
      {
        "day": "Monday",
        "active": true,
        "startTime": "08:30",
        "endTime": "18:30",
        "breakHours": 1
      },
      {
        "day": "Tuesday",
        "active": true,
        "startTime": "08:30",
        "endTime": "18:30",
        "breakHours": 1
      },
      {
        "day": "Wednesday",
        "active": true,
        "startTime": "08:30",
        "endTime": "18:30",
        "breakHours": 1
      },
      {
        "day": "Thursday",
        "active": true,
        "startTime": "08:30",
        "endTime": "18:30",
        "breakHours": 1
      },
      {
        "day": "Friday",
        "active": true,
        "startTime": "08:30",
        "endTime": "18:30",
        "breakHours": 1
      },
      {
        "day": "Saturday",
        "active": false,
        "startTime": "00:00",
        "endTime": "00:00",
        "breakHours": 0
      },
      {
        "day": "Sunday",
        "active": false,
        "startTime": "00:00",
        "endTime": "00:00",
        "breakHours": 0
      }
    ]
  },
  {
    "id": "ws-5",
    "name": "Weekend Shift 36 Hours",
    "calendarType": "Shift Rotation",
    "company": "OxP Pvt Ltd",
    "status": "Active",
    "weeklyHours": 36,
    "daysPerWeek": 3,
    "notes": "Friday through Sunday 12-hour coverage with 1-hour meal break.",
    "days": [
      {
        "day": "Monday",
        "active": false,
        "startTime": "00:00",
        "endTime": "00:00",
        "breakHours": 0
      },
      {
        "day": "Tuesday",
        "active": false,
        "startTime": "00:00",
        "endTime": "00:00",
        "breakHours": 0
      },
      {
        "day": "Wednesday",
        "active": false,
        "startTime": "00:00",
        "endTime": "00:00",
        "breakHours": 0
      },
      {
        "day": "Thursday",
        "active": false,
        "startTime": "00:00",
        "endTime": "00:00",
        "breakHours": 0
      },
      {
        "day": "Friday",
        "active": true,
        "startTime": "08:00",
        "endTime": "21:00",
        "breakHours": 1
      },
      {
        "day": "Saturday",
        "active": true,
        "startTime": "08:00",
        "endTime": "21:00",
        "breakHours": 1
      },
      {
        "day": "Sunday",
        "active": true,
        "startTime": "08:00",
        "endTime": "21:00",
        "breakHours": 1
      }
    ]
  },
  {
    "id": "ws-6",
    "name": "Night Operations 40 Hours",
    "calendarType": "Night Shift",
    "company": "OxP Pvt Ltd",
    "status": "Active",
    "weeklyHours": 40,
    "daysPerWeek": 5,
    "notes": "Overnight systems monitoring shift 21:00 to 06:00.",
    "days": [
      {
        "day": "Monday",
        "active": true,
        "startTime": "21:00",
        "endTime": "06:00",
        "breakHours": 1
      },
      {
        "day": "Tuesday",
        "active": true,
        "startTime": "21:00",
        "endTime": "06:00",
        "breakHours": 1
      },
      {
        "day": "Wednesday",
        "active": true,
        "startTime": "21:00",
        "endTime": "06:00",
        "breakHours": 1
      },
      {
        "day": "Thursday",
        "active": true,
        "startTime": "21:00",
        "endTime": "06:00",
        "breakHours": 1
      },
      {
        "day": "Friday",
        "active": true,
        "startTime": "21:00",
        "endTime": "06:00",
        "breakHours": 1
      },
      {
        "day": "Saturday",
        "active": false,
        "startTime": "00:00",
        "endTime": "00:00",
        "breakHours": 0
      },
      {
        "day": "Sunday",
        "active": false,
        "startTime": "00:00",
        "endTime": "00:00",
        "breakHours": 0
      }
    ]
  },
  {
    "id": "ws-7",
    "name": "DevOps 24x7 Rota",
    "calendarType": "Rotation",
    "company": "OxP Pvt Ltd",
    "status": "Active",
    "weeklyHours": 40,
    "daysPerWeek": 5,
    "notes": "Site reliability engineering on-call rotation.",
    "days": [
      {
        "day": "Monday",
        "active": true,
        "startTime": "09:00",
        "endTime": "18:00",
        "breakHours": 1
      },
      {
        "day": "Tuesday",
        "active": true,
        "startTime": "09:00",
        "endTime": "18:00",
        "breakHours": 1
      },
      {
        "day": "Wednesday",
        "active": true,
        "startTime": "09:00",
        "endTime": "18:00",
        "breakHours": 1
      },
      {
        "day": "Thursday",
        "active": true,
        "startTime": "09:00",
        "endTime": "18:00",
        "breakHours": 1
      },
      {
        "day": "Friday",
        "active": true,
        "startTime": "09:00",
        "endTime": "18:00",
        "breakHours": 1
      },
      {
        "day": "Saturday",
        "active": false,
        "startTime": "00:00",
        "endTime": "00:00",
        "breakHours": 0
      },
      {
        "day": "Sunday",
        "active": false,
        "startTime": "00:00",
        "endTime": "00:00",
        "breakHours": 0
      }
    ]
  },
  {
    "id": "ws-8",
    "name": "Consulting Flexible 30 Hours",
    "calendarType": "Flexible 4-Day",
    "company": "OxP Pvt Ltd",
    "status": "Active",
    "weeklyHours": 30,
    "daysPerWeek": 4,
    "notes": "Four-day compact working week for advisors and consultants.",
    "days": [
      {
        "day": "Monday",
        "active": true,
        "startTime": "09:30",
        "endTime": "18:00",
        "breakHours": 1
      },
      {
        "day": "Tuesday",
        "active": true,
        "startTime": "09:30",
        "endTime": "18:00",
        "breakHours": 1
      },
      {
        "day": "Wednesday",
        "active": true,
        "startTime": "09:30",
        "endTime": "18:00",
        "breakHours": 1
      },
      {
        "day": "Thursday",
        "active": true,
        "startTime": "09:30",
        "endTime": "18:00",
        "breakHours": 1
      },
      {
        "day": "Friday",
        "active": false,
        "startTime": "00:00",
        "endTime": "00:00",
        "breakHours": 0
      },
      {
        "day": "Saturday",
        "active": false,
        "startTime": "00:00",
        "endTime": "00:00",
        "breakHours": 0
      },
      {
        "day": "Sunday",
        "active": false,
        "startTime": "00:00",
        "endTime": "00:00",
        "breakHours": 0
      }
    ]
  }
];

export const SEED_EMPLOYEES = [
  {
    "id": "emp-1",
    "customId": "emp-1",
    "initials": "AM",
    "name": "Aarav Mehta",
    "jobPosition": "Payroll Specialist",
    "department": "Finance & Payroll",
    "manager": "Sara Khan",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Mumbai",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "payrollmanager@peoplepay360.com",
    "phone": "+91 98765 43210",
    "contractsCount": 1,
    "attendanceCount": 12,
    "timeOffCount": 1,
    "bankAccount": "HDFC0001234 - 98765432101",
    "isBankVerified": true
  },
  {
    "id": "emp-2",
    "customId": "emp-2",
    "initials": "SK",
    "name": "Sara Khan",
    "jobPosition": "HR Officer",
    "department": "Human Resources",
    "manager": "Falguni Nayar",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Bangalore",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "hrmanager@peoplepay360.com",
    "phone": "+91 98765 43211",
    "contractsCount": 1,
    "attendanceCount": 13,
    "timeOffCount": 2,
    "bankAccount": "",
    "isBankVerified": false
  },
  {
    "id": "emp-3",
    "customId": "emp-3",
    "initials": "JD",
    "name": "John Dsouza",
    "jobPosition": "Developer",
    "department": "Engineering",
    "manager": "Rahul Dravid",
    "workingScheduleId": "ws-2",
    "workingSchedule": "Tech Flexible 35 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Pune",
    "employmentType": "Contract",
    "status": "Active",
    "workEmail": "john@oxp.com",
    "phone": "+91 98765 43212",
    "contractsCount": 1,
    "attendanceCount": 14,
    "timeOffCount": 3,
    "bankAccount": "ICIC0005432 - 12345678902",
    "isBankVerified": true
  },
  {
    "id": "emp-4",
    "customId": "emp-4",
    "initials": "NP",
    "name": "Neha Patel",
    "jobPosition": "Recruiter",
    "department": "Human Resources",
    "manager": "Sara Khan",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Mumbai",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "neha@oxp.com",
    "phone": "+91 98765 43213",
    "contractsCount": 1,
    "attendanceCount": 15,
    "timeOffCount": 4,
    "bankAccount": "SBIN0008765 - 55443322110",
    "isBankVerified": true
  },
  {
    "id": "emp-5",
    "customId": "emp-5",
    "initials": "RP",
    "name": "Rohan Patel",
    "jobPosition": "Junior Software Engineer",
    "department": "Engineering",
    "manager": "Rahul Dravid",
    "workingScheduleId": "ws-2",
    "workingSchedule": "Tech Flexible 35 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Mumbai Tech Hub",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "employee@peoplepay360.com",
    "phone": "+91 98765 43219",
    "contractsCount": 1,
    "attendanceCount": 16,
    "timeOffCount": 1,
    "bankAccount": "KKBK0001928 - 99887766554",
    "isBankVerified": true
  },
  {
    "id": "emp-6",
    "customId": "emp-6",
    "initials": "VM",
    "name": "Vikram Malhotra",
    "jobPosition": "Principal Architect",
    "department": "Engineering",
    "manager": "Rahul Dravid",
    "workingScheduleId": "ws-2",
    "workingSchedule": "Tech Flexible 35 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Bangalore",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "vikram.m@peoplepay360.com",
    "phone": "+91 98201 11223",
    "contractsCount": 1,
    "attendanceCount": 17,
    "timeOffCount": 2,
    "bankAccount": "HDFC0002345 - 11223344556",
    "isBankVerified": true
  },
  {
    "id": "emp-7",
    "customId": "emp-7",
    "initials": "PS",
    "name": "Priya Sharma",
    "jobPosition": "Senior Product Manager",
    "department": "Product Management",
    "manager": "Aarav Mehta",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Mumbai",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "priya.s@peoplepay360.com",
    "phone": "+91 98202 22334",
    "contractsCount": 1,
    "attendanceCount": 18,
    "timeOffCount": 3,
    "bankAccount": "ICIC0003456 - 22334455667",
    "isBankVerified": true
  },
  {
    "id": "emp-8",
    "customId": "emp-8",
    "initials": "AK",
    "name": "Aditya Kapoor",
    "jobPosition": "Tech Lead",
    "department": "Engineering",
    "manager": "Vikram Malhotra",
    "workingScheduleId": "ws-2",
    "workingSchedule": "Tech Flexible 35 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Pune",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "aditya.k@peoplepay360.com",
    "phone": "+91 98203 33445",
    "contractsCount": 1,
    "attendanceCount": 19,
    "timeOffCount": 4,
    "bankAccount": "UTIB0004567 - 33445566778",
    "isBankVerified": true
  },
  {
    "id": "emp-9",
    "customId": "emp-9",
    "initials": "AI",
    "name": "Ananya Iyer",
    "jobPosition": "Senior Financial Analyst",
    "department": "Finance & Payroll",
    "manager": "Aarav Mehta",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Mumbai",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "payrolluser@peoplepay360.com",
    "phone": "+91 98204 44556",
    "contractsCount": 1,
    "attendanceCount": 12,
    "timeOffCount": 1,
    "bankAccount": "SBIN0005678 - 44556677889",
    "isBankVerified": true
  },
  {
    "id": "emp-10",
    "customId": "emp-10",
    "initials": "RN",
    "name": "Rajesh Nair",
    "jobPosition": "VP of Global Sales",
    "department": "Sales & Business Dev",
    "manager": "Falguni Nayar",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Mumbai",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "rajesh.n@peoplepay360.com",
    "phone": "+91 98205 55667",
    "contractsCount": 1,
    "attendanceCount": 13,
    "timeOffCount": 2,
    "bankAccount": "HDFC0006789 - 55667788990",
    "isBankVerified": true
  },
  {
    "id": "emp-11",
    "customId": "emp-11",
    "initials": "SJ",
    "name": "Sneha Joshi",
    "jobPosition": "Growth Marketing Lead",
    "department": "Marketing & Growth",
    "manager": "Rajesh Nair",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Delhi NCR",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "sneha.j@peoplepay360.com",
    "phone": "+91 98206 66778",
    "contractsCount": 1,
    "attendanceCount": 14,
    "timeOffCount": 3,
    "bankAccount": "ICIC0007890 - 66778899001",
    "isBankVerified": true
  },
  {
    "id": "emp-12",
    "customId": "emp-12",
    "initials": "KD",
    "name": "Kabir Deshmukh",
    "jobPosition": "Head of Customer Experience",
    "department": "Customer Success",
    "manager": "Sara Khan",
    "workingScheduleId": "ws-4",
    "workingSchedule": "Extended Support 45 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Bangalore",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "kabir.d@peoplepay360.com",
    "phone": "+91 98207 77889",
    "contractsCount": 1,
    "attendanceCount": 15,
    "timeOffCount": 4,
    "bankAccount": "KKBK0008901 - 77889900112",
    "isBankVerified": true
  },
  {
    "id": "emp-13",
    "customId": "emp-13",
    "initials": "MS",
    "name": "Meera Sen",
    "jobPosition": "Frontend Engineer",
    "department": "Engineering",
    "manager": "Aditya Kapoor",
    "workingScheduleId": "ws-2",
    "workingSchedule": "Tech Flexible 35 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Kolkata",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "meera.s@peoplepay360.com",
    "phone": "+91 98208 88990",
    "contractsCount": 1,
    "attendanceCount": 16,
    "timeOffCount": 1,
    "bankAccount": "UTIB0009012 - 88990011223",
    "isBankVerified": true
  },
  {
    "id": "emp-14",
    "customId": "emp-14",
    "initials": "DR",
    "name": "Devendra Rao",
    "jobPosition": "Operations Director",
    "department": "Operations & Admin",
    "manager": "Falguni Nayar",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Hyderabad",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "devendra.r@peoplepay360.com",
    "phone": "+91 98209 99001",
    "contractsCount": 1,
    "attendanceCount": 17,
    "timeOffCount": 2,
    "bankAccount": "SBIN0000123 - 99001122334",
    "isBankVerified": true
  },
  {
    "id": "emp-15",
    "customId": "emp-15",
    "initials": "IB",
    "name": "Ishaan Bhat",
    "jobPosition": "DevOps Engineer",
    "department": "Engineering",
    "manager": "Vikram Malhotra",
    "workingScheduleId": "ws-7",
    "workingSchedule": "DevOps 24x7 Rota",
    "company": "OxP Pvt Ltd",
    "workLocation": "Bangalore",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "ishaan.b@peoplepay360.com",
    "phone": "+91 98210 10293",
    "contractsCount": 1,
    "attendanceCount": 18,
    "timeOffCount": 3,
    "bankAccount": "HDFC0001239 - 10293847561",
    "isBankVerified": true
  },
  {
    "id": "emp-16",
    "customId": "emp-16",
    "initials": "TK",
    "name": "Tanvi Kulkarni",
    "jobPosition": "QA Lead",
    "department": "Quality Assurance",
    "manager": "Rahul Dravid",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Pune",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "tanvi.k@peoplepay360.com",
    "phone": "+91 98211 21304",
    "contractsCount": 1,
    "attendanceCount": 19,
    "timeOffCount": 4,
    "bankAccount": "ICIC0002348 - 21304958672",
    "isBankVerified": true
  },
  {
    "id": "emp-17",
    "customId": "emp-17",
    "initials": "SV",
    "name": "Siddharth Varma",
    "jobPosition": "Backend Developer",
    "department": "Engineering",
    "manager": "Aditya Kapoor",
    "workingScheduleId": "ws-2",
    "workingSchedule": "Tech Flexible 35 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Mumbai",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "siddharth.v@peoplepay360.com",
    "phone": "+91 98212 32415",
    "contractsCount": 1,
    "attendanceCount": 12,
    "timeOffCount": 1,
    "bankAccount": "KKBK0003457 - 32415069783",
    "isBankVerified": true
  },
  {
    "id": "emp-18",
    "customId": "emp-18",
    "initials": "PH",
    "name": "Pooja Hegde",
    "jobPosition": "Talent Acquisition Specialist",
    "department": "Human Resources",
    "manager": "Neha Patel",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Bangalore",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "pooja.h@peoplepay360.com",
    "phone": "+91 98213 43526",
    "contractsCount": 1,
    "attendanceCount": 13,
    "timeOffCount": 2,
    "bankAccount": "UTIB0004566 - 43526170894",
    "isBankVerified": true
  },
  {
    "id": "emp-19",
    "customId": "emp-19",
    "initials": "MR",
    "name": "Manav Reddy",
    "jobPosition": "Enterprise Account Executive",
    "department": "Sales & Business Dev",
    "manager": "Rajesh Nair",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Hyderabad",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "manav.r@peoplepay360.com",
    "phone": "+91 98214 54637",
    "contractsCount": 1,
    "attendanceCount": 14,
    "timeOffCount": 3,
    "bankAccount": "SBIN0005675 - 54637281905",
    "isBankVerified": true
  },
  {
    "id": "emp-20",
    "customId": "emp-20",
    "initials": "RS",
    "name": "Riya Sengupta",
    "jobPosition": "Legal & Compliance Counsel",
    "department": "Legal & Compliance",
    "manager": "Sara Khan",
    "workingScheduleId": "ws-8",
    "workingSchedule": "Consulting Flexible 30 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Delhi NCR",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "riya.s@peoplepay360.com",
    "phone": "+91 98215 65748",
    "contractsCount": 1,
    "attendanceCount": 15,
    "timeOffCount": 4,
    "bankAccount": "HDFC0006784 - 65748392016",
    "isBankVerified": true
  },
  {
    "id": "emp-21",
    "customId": "emp-21",
    "initials": "KR",
    "name": "Kunal Roy",
    "jobPosition": "Cloud Infrastructure Architect",
    "department": "Engineering",
    "manager": "Vikram Malhotra",
    "workingScheduleId": "ws-7",
    "workingSchedule": "DevOps 24x7 Rota",
    "company": "OxP Pvt Ltd",
    "workLocation": "Bangalore",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "kunal.r@peoplepay360.com",
    "phone": "+91 98216 76859",
    "contractsCount": 1,
    "attendanceCount": 16,
    "timeOffCount": 1,
    "bankAccount": "ICIC0007893 - 76859403127",
    "isBankVerified": true
  },
  {
    "id": "emp-22",
    "customId": "emp-22",
    "initials": "DB",
    "name": "Diya Bansal",
    "jobPosition": "Accounts Payable Executive",
    "department": "Finance & Payroll",
    "manager": "Ananya Iyer",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Mumbai",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "diya.b@peoplepay360.com",
    "phone": "+91 98217 87960",
    "contractsCount": 1,
    "attendanceCount": 17,
    "timeOffCount": 2,
    "bankAccount": "KKBK0008902 - 87960514238",
    "isBankVerified": true
  },
  {
    "id": "emp-23",
    "customId": "emp-23",
    "initials": "AS",
    "name": "Arjun Singhania",
    "jobPosition": "UI/UX Designer",
    "department": "Product Management",
    "manager": "Priya Sharma",
    "workingScheduleId": "ws-2",
    "workingSchedule": "Tech Flexible 35 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Mumbai",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "arjun.s@peoplepay360.com",
    "phone": "+91 98218 98071",
    "contractsCount": 1,
    "attendanceCount": 18,
    "timeOffCount": 3,
    "bankAccount": "UTIB0009011 - 98071625349",
    "isBankVerified": true
  },
  {
    "id": "emp-24",
    "customId": "emp-24",
    "initials": "SG",
    "name": "Shreya Ghoshal",
    "jobPosition": "Content Strategist",
    "department": "Marketing & Growth",
    "manager": "Sneha Joshi",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Kolkata",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "shreya.g@peoplepay360.com",
    "phone": "+91 98219 09182",
    "contractsCount": 1,
    "attendanceCount": 19,
    "timeOffCount": 4,
    "bankAccount": "SBIN0000120 - 09182736450",
    "isBankVerified": true
  },
  {
    "id": "emp-25",
    "customId": "emp-25",
    "initials": "VG",
    "name": "Varun Grover",
    "jobPosition": "Full Stack Engineer",
    "department": "Engineering",
    "manager": "Aditya Kapoor",
    "workingScheduleId": "ws-2",
    "workingSchedule": "Tech Flexible 35 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Mumbai",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "varun.g@peoplepay360.com",
    "phone": "+91 98220 19283",
    "contractsCount": 1,
    "attendanceCount": 12,
    "timeOffCount": 1,
    "bankAccount": "HDFC0001231 - 19283746502",
    "isBankVerified": true
  },
  {
    "id": "emp-26",
    "customId": "emp-26",
    "initials": "KS",
    "name": "Kriti Sanon",
    "jobPosition": "Employee Experience Specialist",
    "department": "Human Resources",
    "manager": "Sara Khan",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Delhi NCR",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "kriti.s@peoplepay360.com",
    "phone": "+91 98221 28374",
    "contractsCount": 1,
    "attendanceCount": 13,
    "timeOffCount": 2,
    "bankAccount": "ICIC0002342 - 28374650913",
    "isBankVerified": true
  },
  {
    "id": "emp-27",
    "customId": "emp-27",
    "initials": "NC",
    "name": "Nikhil Chinapa",
    "jobPosition": "Technical Support Engineer",
    "department": "Customer Success",
    "manager": "Kabir Deshmukh",
    "workingScheduleId": "ws-4",
    "workingSchedule": "Extended Support 45 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Bangalore",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "nikhil.c@peoplepay360.com",
    "phone": "+91 98222 37465",
    "contractsCount": 1,
    "attendanceCount": 14,
    "timeOffCount": 3,
    "bankAccount": "KKBK0003453 - 37465091824",
    "isBankVerified": true
  },
  {
    "id": "emp-28",
    "customId": "emp-28",
    "initials": "AB",
    "name": "Alia Bhattacharya",
    "jobPosition": "Data Engineer",
    "department": "Engineering",
    "manager": "Vikram Malhotra",
    "workingScheduleId": "ws-2",
    "workingSchedule": "Tech Flexible 35 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Kolkata",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "alia.b@peoplepay360.com",
    "phone": "+91 98223 46509",
    "contractsCount": 1,
    "attendanceCount": 15,
    "timeOffCount": 4,
    "bankAccount": "UTIB0004564 - 46509182735",
    "isBankVerified": true
  },
  {
    "id": "emp-29",
    "customId": "emp-29",
    "initials": "GG",
    "name": "Gautam Gambhir",
    "jobPosition": "Facilities Manager",
    "department": "Operations & Admin",
    "manager": "Devendra Rao",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Delhi NCR",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "gautam.g@peoplepay360.com",
    "phone": "+91 98224 55609",
    "contractsCount": 1,
    "attendanceCount": 16,
    "timeOffCount": 1,
    "bankAccount": "SBIN0005675 - 55609182736",
    "isBankVerified": true
  },
  {
    "id": "emp-30",
    "customId": "emp-30",
    "initials": "SW",
    "name": "Simran Walia",
    "jobPosition": "Automation QA Specialist",
    "department": "Quality Assurance",
    "manager": "Tanvi Kulkarni",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Chandigarh",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "simran.w@peoplepay360.com",
    "phone": "+91 98225 64718",
    "contractsCount": 1,
    "attendanceCount": 17,
    "timeOffCount": 2,
    "bankAccount": "HDFC0006786 - 64718293047",
    "isBankVerified": true
  },
  {
    "id": "emp-31",
    "customId": "emp-31",
    "initials": "TK",
    "name": "Tarun Khanna",
    "jobPosition": "Tax & Regulatory Specialist",
    "department": "Finance & Payroll",
    "manager": "Aarav Mehta",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Mumbai",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "tarun.k@peoplepay360.com",
    "phone": "+91 98226 73829",
    "contractsCount": 1,
    "attendanceCount": 18,
    "timeOffCount": 3,
    "bankAccount": "ICIC0007897 - 73829104158",
    "isBankVerified": true
  },
  {
    "id": "emp-32",
    "customId": "emp-32",
    "initials": "NP",
    "name": "Natasha Poonawalla",
    "jobPosition": "Inside Sales Representative",
    "department": "Sales & Business Dev",
    "manager": "Manav Reddy",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Pune",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "natasha.p@peoplepay360.com",
    "phone": "+91 98227 82930",
    "contractsCount": 1,
    "attendanceCount": 19,
    "timeOffCount": 4,
    "bankAccount": "KKBK0008908 - 82930415269",
    "isBankVerified": true
  },
  {
    "id": "emp-33",
    "customId": "emp-33",
    "initials": "PA",
    "name": "Pranav Anand",
    "jobPosition": "Mobile App Developer",
    "department": "Engineering",
    "manager": "Aditya Kapoor",
    "workingScheduleId": "ws-2",
    "workingSchedule": "Tech Flexible 35 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Chennai",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "pranav.a@peoplepay360.com",
    "phone": "+91 98228 91041",
    "contractsCount": 1,
    "attendanceCount": 12,
    "timeOffCount": 1,
    "bankAccount": "UTIB0009019 - 91041526370",
    "isBankVerified": true
  },
  {
    "id": "emp-34",
    "customId": "emp-34",
    "initials": "SP",
    "name": "Swati Piramal",
    "jobPosition": "Digital Media Specialist",
    "department": "Marketing & Growth",
    "manager": "Sneha Joshi",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Mumbai",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "swati.p@peoplepay360.com",
    "phone": "+91 98229 10293",
    "contractsCount": 1,
    "attendanceCount": 13,
    "timeOffCount": 2,
    "bankAccount": "SBIN0000128 - 10293847581",
    "isBankVerified": true
  },
  {
    "id": "emp-35",
    "customId": "emp-35",
    "initials": "HV",
    "name": "Harsh Vardhan",
    "jobPosition": "Security & SecOps Analyst",
    "department": "Engineering",
    "manager": "Vikram Malhotra",
    "workingScheduleId": "ws-7",
    "workingSchedule": "DevOps 24x7 Rota",
    "company": "OxP Pvt Ltd",
    "workLocation": "Bangalore",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "harsh.v@peoplepay360.com",
    "phone": "+91 98230 21304",
    "contractsCount": 1,
    "attendanceCount": 14,
    "timeOffCount": 3,
    "bankAccount": "HDFC0001237 - 21304958692",
    "isBankVerified": true
  },
  {
    "id": "emp-36",
    "customId": "emp-36",
    "initials": "LS",
    "name": "Lavanya Sundaram",
    "jobPosition": "Treasury Analyst",
    "department": "Finance & Payroll",
    "manager": "Ananya Iyer",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Chennai",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "lavanya.s@peoplepay360.com",
    "phone": "+91 98231 32415",
    "contractsCount": 1,
    "attendanceCount": 15,
    "timeOffCount": 4,
    "bankAccount": "",
    "isBankVerified": false
  },
  {
    "id": "emp-37",
    "customId": "emp-37",
    "initials": "RK",
    "name": "Rishi Kapoor",
    "jobPosition": "Associate Product Manager",
    "department": "Product Management",
    "manager": "Priya Sharma",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Mumbai",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "rishi.k@peoplepay360.com",
    "phone": "+91 98232 43526",
    "contractsCount": 1,
    "attendanceCount": 16,
    "timeOffCount": 1,
    "bankAccount": "ICIC0002346 - 32415069703",
    "isBankVerified": true
  },
  {
    "id": "emp-38",
    "customId": "emp-38",
    "initials": "AC",
    "name": "Avani Chaturvedi",
    "jobPosition": "Systems Reliability Engineer",
    "department": "Engineering",
    "manager": "Ishaan Bhat",
    "workingScheduleId": "ws-7",
    "workingSchedule": "DevOps 24x7 Rota",
    "company": "OxP Pvt Ltd",
    "workLocation": "Hyderabad",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "avani.c@peoplepay360.com",
    "phone": "+91 98233 54637",
    "contractsCount": 1,
    "attendanceCount": 17,
    "timeOffCount": 2,
    "bankAccount": "KKBK0003455 - 43526170814",
    "isBankVerified": true
  },
  {
    "id": "emp-39",
    "customId": "emp-39",
    "initials": "MC",
    "name": "Mohit Chauhan",
    "jobPosition": "Regional Sales Manager - West",
    "department": "Sales & Business Dev",
    "manager": "Rajesh Nair",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Ahmedabad",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "mohit.c@peoplepay360.com",
    "phone": "+91 98234 65748",
    "contractsCount": 1,
    "attendanceCount": 18,
    "timeOffCount": 3,
    "bankAccount": "UTIB0004564 - 54637281925",
    "isBankVerified": true
  },
  {
    "id": "emp-40",
    "customId": "emp-40",
    "initials": "SN",
    "name": "Sunita Narain",
    "jobPosition": "Procurement Executive",
    "department": "Operations & Admin",
    "manager": "Devendra Rao",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Delhi NCR",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "sunita.n@peoplepay360.com",
    "phone": "+91 98235 76859",
    "contractsCount": 1,
    "attendanceCount": 19,
    "timeOffCount": 4,
    "bankAccount": "SBIN0005673 - 65748392036",
    "isBankVerified": true
  },
  {
    "id": "emp-41",
    "customId": "emp-41",
    "initials": "RD",
    "name": "Rahul Dravid",
    "jobPosition": "Engineering Manager",
    "department": "Engineering",
    "manager": "Sara Khan",
    "workingScheduleId": "ws-2",
    "workingSchedule": "Tech Flexible 35 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Bangalore",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "rahul.d@peoplepay360.com",
    "phone": "+91 98236 87960",
    "contractsCount": 1,
    "attendanceCount": 12,
    "timeOffCount": 1,
    "bankAccount": "HDFC0006782 - 76859403147",
    "isBankVerified": true
  },
  {
    "id": "emp-42",
    "customId": "emp-42",
    "initials": "FS",
    "name": "Fatima Sana",
    "jobPosition": "Customer Support Specialist",
    "department": "Customer Success",
    "manager": "Kabir Deshmukh",
    "workingScheduleId": "ws-4",
    "workingSchedule": "Extended Support 45 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Pune",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "fatima.s@peoplepay360.com",
    "phone": "+91 98237 98071",
    "contractsCount": 1,
    "attendanceCount": 13,
    "timeOffCount": 2,
    "bankAccount": "ICIC0007891 - 87960514258",
    "isBankVerified": true
  },
  {
    "id": "emp-43",
    "customId": "emp-43",
    "initials": "CB",
    "name": "Chetan Bhagat",
    "jobPosition": "Copywriter & Brand Strategist",
    "department": "Marketing & Growth",
    "manager": "Sneha Joshi",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Mumbai",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "chetan.b@peoplepay360.com",
    "phone": "+91 98238 09182",
    "contractsCount": 1,
    "attendanceCount": 14,
    "timeOffCount": 3,
    "bankAccount": "KKBK0008900 - 98071625369",
    "isBankVerified": true
  },
  {
    "id": "emp-44",
    "customId": "emp-44",
    "initials": "DG",
    "name": "Deepinder Goyal",
    "jobPosition": "Staff Software Engineer",
    "department": "Engineering",
    "manager": "Rahul Dravid",
    "workingScheduleId": "ws-2",
    "workingSchedule": "Tech Flexible 35 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Delhi NCR",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "deepinder.g@peoplepay360.com",
    "phone": "+91 98239 10293",
    "contractsCount": 1,
    "attendanceCount": 15,
    "timeOffCount": 4,
    "bankAccount": "UTIB0009019 - 09182736470",
    "isBankVerified": true
  },
  {
    "id": "emp-45",
    "customId": "emp-45",
    "initials": "FN",
    "name": "Falguni Nayar",
    "jobPosition": "Chief Financial Officer",
    "department": "Finance & Payroll",
    "manager": "Sara Khan",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Mumbai",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "admin@peoplepay360.com",
    "phone": "+91 98240 21304",
    "contractsCount": 1,
    "attendanceCount": 16,
    "timeOffCount": 1,
    "bankAccount": "SBIN0000128 - 19283746581",
    "isBankVerified": true
  },
  {
    "id": "emp-46",
    "customId": "emp-46",
    "initials": "JB",
    "name": "Jaspreet Bumrah",
    "jobPosition": "Performance Testing Engineer",
    "department": "Quality Assurance",
    "manager": "Tanvi Kulkarni",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Ahmedabad",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "jaspreet.b@peoplepay360.com",
    "phone": "+91 98241 32415",
    "contractsCount": 1,
    "attendanceCount": 17,
    "timeOffCount": 2,
    "bankAccount": "HDFC0001237 - 28374650992",
    "isBankVerified": true
  },
  {
    "id": "emp-47",
    "customId": "emp-47",
    "initials": "VB",
    "name": "Vidya Balan",
    "jobPosition": "People Operations Partner",
    "department": "Human Resources",
    "manager": "Sara Khan",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Mumbai",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "vidya.b@peoplepay360.com",
    "phone": "+91 98242 43526",
    "contractsCount": 1,
    "attendanceCount": 18,
    "timeOffCount": 3,
    "bankAccount": "ICIC0002346 - 37465091803",
    "isBankVerified": true
  },
  {
    "id": "emp-48",
    "customId": "emp-48",
    "initials": "ST",
    "name": "Sachin Tendulkar",
    "jobPosition": "Director of Strategic Partnerships",
    "department": "Sales & Business Dev",
    "manager": "Rajesh Nair",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Mumbai",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "sachin.t@peoplepay360.com",
    "phone": "+91 98243 54637",
    "contractsCount": 1,
    "attendanceCount": 19,
    "timeOffCount": 4,
    "bankAccount": "KKBK0003455 - 46509182714",
    "isBankVerified": true
  },
  {
    "id": "emp-49",
    "customId": "emp-49",
    "initials": "MR",
    "name": "Mithali Raj",
    "jobPosition": "Logistics & Facilities Lead",
    "department": "Operations & Admin",
    "manager": "Devendra Rao",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Hyderabad",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "mithali.r@peoplepay360.com",
    "phone": "+91 98244 65748",
    "contractsCount": 1,
    "attendanceCount": 12,
    "timeOffCount": 1,
    "bankAccount": "UTIB0004564 - 55609182725",
    "isBankVerified": true
  },
  {
    "id": "emp-50",
    "customId": "emp-50",
    "initials": "BI",
    "name": "Boman Irani",
    "jobPosition": "Internal IT Support Specialist",
    "department": "Operations & Admin",
    "manager": "Devendra Rao",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "company": "OxP Pvt Ltd",
    "workLocation": "Mumbai",
    "employmentType": "Full-time",
    "status": "Active",
    "workEmail": "boman.i@peoplepay360.com",
    "phone": "+91 98245 76859",
    "contractsCount": 1,
    "attendanceCount": 13,
    "timeOffCount": 2,
    "bankAccount": "SBIN0005673 - 64718293036",
    "isBankVerified": true
  }
];

export const SEED_CONTRACTS = [
  {
    "id": "con-1",
    "customId": "con-1",
    "contractNumber": "CON/2026/0001",
    "employeeId": "emp-1",
    "employeeName": "Aarav Mehta",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 85000,
    "status": "Running",
    "department": "Finance & Payroll",
    "jobPosition": "Payroll Specialist",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Aarav Mehta in Finance & Payroll."
  },
  {
    "id": "con-2",
    "customId": "con-2",
    "contractNumber": "CON/2026/0002",
    "employeeId": "emp-2",
    "employeeName": "Sara Khan",
    "startDate": "2025-01-01",
    "endDate": "2025-12-31",
    "duration": "1 Year (Expired 31-Dec-2025)",
    "wage": 95000,
    "status": "Expired",
    "department": "Human Resources",
    "jobPosition": "HR Officer",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Sara Khan in Human Resources."
  },
  {
    "id": "con-3",
    "customId": "con-3",
    "contractNumber": "CON/2026/0003",
    "employeeId": "emp-3",
    "employeeName": "John Dsouza",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 72000,
    "status": "Running",
    "department": "Engineering",
    "jobPosition": "Developer",
    "workingScheduleId": "ws-2",
    "workingSchedule": "Tech Flexible 35 Hours",
    "structureType": "Contractor Fixed",
    "notes": "Standard full-time active agreement for John Dsouza in Engineering."
  },
  {
    "id": "con-4",
    "customId": "con-4",
    "contractNumber": "CON/2026/0004",
    "employeeId": "emp-4",
    "employeeName": "Neha Patel",
    "startDate": "2025-07-01",
    "endDate": "",
    "duration": "Ongoing (Started 2025-07-01)",
    "wage": 68000,
    "status": "Running",
    "department": "Human Resources",
    "jobPosition": "Recruiter",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Neha Patel in Human Resources."
  },
  {
    "id": "con-5",
    "customId": "con-5",
    "contractNumber": "CON/2026/0005",
    "employeeId": "emp-5",
    "employeeName": "Rohan Patel",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 65000,
    "status": "Running",
    "department": "Engineering",
    "jobPosition": "Junior Software Engineer",
    "workingScheduleId": "ws-2",
    "workingSchedule": "Tech Flexible 35 Hours",
    "structureType": "Tech Specialist",
    "notes": "Standard full-time active agreement for Rohan Patel in Engineering."
  },
  {
    "id": "con-6",
    "customId": "con-6",
    "contractNumber": "CON/2026/0006",
    "employeeId": "emp-6",
    "employeeName": "Vikram Malhotra",
    "startDate": "2025-07-01",
    "endDate": "",
    "duration": "Ongoing (Started 2025-07-01)",
    "wage": 220000,
    "status": "Running",
    "department": "Engineering",
    "jobPosition": "Principal Architect",
    "workingScheduleId": "ws-2",
    "workingSchedule": "Tech Flexible 35 Hours",
    "structureType": "Tech Specialist",
    "notes": "Standard full-time active agreement for Vikram Malhotra in Engineering."
  },
  {
    "id": "con-7",
    "customId": "con-7",
    "contractNumber": "CON/2026/0007",
    "employeeId": "emp-7",
    "employeeName": "Priya Sharma",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 160000,
    "status": "Running",
    "department": "Product Management",
    "jobPosition": "Senior Product Manager",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Priya Sharma in Product Management."
  },
  {
    "id": "con-8",
    "customId": "con-8",
    "contractNumber": "CON/2026/0008",
    "employeeId": "emp-8",
    "employeeName": "Aditya Kapoor",
    "startDate": "2025-07-01",
    "endDate": "",
    "duration": "Ongoing (Started 2025-07-01)",
    "wage": 150000,
    "status": "Running",
    "department": "Engineering",
    "jobPosition": "Tech Lead",
    "workingScheduleId": "ws-2",
    "workingSchedule": "Tech Flexible 35 Hours",
    "structureType": "Tech Specialist",
    "notes": "Standard full-time active agreement for Aditya Kapoor in Engineering."
  },
  {
    "id": "con-9",
    "customId": "con-9",
    "contractNumber": "CON/2026/0009",
    "employeeId": "emp-9",
    "employeeName": "Ananya Iyer",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 110000,
    "status": "Running",
    "department": "Finance & Payroll",
    "jobPosition": "Senior Financial Analyst",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Ananya Iyer in Finance & Payroll."
  },
  {
    "id": "con-10",
    "customId": "con-10",
    "contractNumber": "CON/2026/0010",
    "employeeId": "emp-10",
    "employeeName": "Rajesh Nair",
    "startDate": "2025-07-01",
    "endDate": "",
    "duration": "Ongoing (Started 2025-07-01)",
    "wage": 240000,
    "status": "Running",
    "department": "Sales & Business Dev",
    "jobPosition": "VP of Global Sales",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Executive Leadership",
    "notes": "Standard full-time active agreement for Rajesh Nair in Sales & Business Dev."
  },
  {
    "id": "con-11",
    "customId": "con-11",
    "contractNumber": "CON/2026/0011",
    "employeeId": "emp-11",
    "employeeName": "Sneha Joshi",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 125000,
    "status": "Running",
    "department": "Marketing & Growth",
    "jobPosition": "Growth Marketing Lead",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Sneha Joshi in Marketing & Growth."
  },
  {
    "id": "con-12",
    "customId": "con-12",
    "contractNumber": "CON/2026/0012",
    "employeeId": "emp-12",
    "employeeName": "Kabir Deshmukh",
    "startDate": "2025-07-01",
    "endDate": "",
    "duration": "Ongoing (Started 2025-07-01)",
    "wage": 130000,
    "status": "Running",
    "department": "Customer Success",
    "jobPosition": "Head of Customer Experience",
    "workingScheduleId": "ws-4",
    "workingSchedule": "Extended Support 45 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Kabir Deshmukh in Customer Success."
  },
  {
    "id": "con-13",
    "customId": "con-13",
    "contractNumber": "CON/2026/0013",
    "employeeId": "emp-13",
    "employeeName": "Meera Sen",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 82000,
    "status": "Running",
    "department": "Engineering",
    "jobPosition": "Frontend Engineer",
    "workingScheduleId": "ws-2",
    "workingSchedule": "Tech Flexible 35 Hours",
    "structureType": "Tech Specialist",
    "notes": "Standard full-time active agreement for Meera Sen in Engineering."
  },
  {
    "id": "con-14",
    "customId": "con-14",
    "contractNumber": "CON/2026/0014",
    "employeeId": "emp-14",
    "employeeName": "Devendra Rao",
    "startDate": "2025-07-01",
    "endDate": "",
    "duration": "Ongoing (Started 2025-07-01)",
    "wage": 175000,
    "status": "Running",
    "department": "Operations & Admin",
    "jobPosition": "Operations Director",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Executive Leadership",
    "notes": "Standard full-time active agreement for Devendra Rao in Operations & Admin."
  },
  {
    "id": "con-15",
    "customId": "con-15",
    "contractNumber": "CON/2026/0015",
    "employeeId": "emp-15",
    "employeeName": "Ishaan Bhat",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 95000,
    "status": "Running",
    "department": "Engineering",
    "jobPosition": "DevOps Engineer",
    "workingScheduleId": "ws-7",
    "workingSchedule": "DevOps 24x7 Rota",
    "structureType": "Tech Specialist",
    "notes": "Standard full-time active agreement for Ishaan Bhat in Engineering."
  },
  {
    "id": "con-16",
    "customId": "con-16",
    "contractNumber": "CON/2026/0016",
    "employeeId": "emp-16",
    "employeeName": "Tanvi Kulkarni",
    "startDate": "2025-07-01",
    "endDate": "",
    "duration": "Ongoing (Started 2025-07-01)",
    "wage": 115000,
    "status": "Running",
    "department": "Quality Assurance",
    "jobPosition": "QA Lead",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Tanvi Kulkarni in Quality Assurance."
  },
  {
    "id": "con-17",
    "customId": "con-17",
    "contractNumber": "CON/2026/0017",
    "employeeId": "emp-17",
    "employeeName": "Siddharth Varma",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 88000,
    "status": "Running",
    "department": "Engineering",
    "jobPosition": "Backend Developer",
    "workingScheduleId": "ws-2",
    "workingSchedule": "Tech Flexible 35 Hours",
    "structureType": "Tech Specialist",
    "notes": "Standard full-time active agreement for Siddharth Varma in Engineering."
  },
  {
    "id": "con-18",
    "customId": "con-18",
    "contractNumber": "CON/2026/0018",
    "employeeId": "emp-18",
    "employeeName": "Pooja Hegde",
    "startDate": "2025-07-01",
    "endDate": "",
    "duration": "Ongoing (Started 2025-07-01)",
    "wage": 70000,
    "status": "Running",
    "department": "Human Resources",
    "jobPosition": "Talent Acquisition Specialist",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Pooja Hegde in Human Resources."
  },
  {
    "id": "con-19",
    "customId": "con-19",
    "contractNumber": "CON/2026/0019",
    "employeeId": "emp-19",
    "employeeName": "Manav Reddy",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 105000,
    "status": "Running",
    "department": "Sales & Business Dev",
    "jobPosition": "Enterprise Account Executive",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Sales Commission",
    "notes": "Standard full-time active agreement for Manav Reddy in Sales & Business Dev."
  },
  {
    "id": "con-20",
    "customId": "con-20",
    "contractNumber": "CON/2026/0020",
    "employeeId": "emp-20",
    "employeeName": "Riya Sengupta",
    "startDate": "2025-07-01",
    "endDate": "",
    "duration": "Ongoing (Started 2025-07-01)",
    "wage": 145000,
    "status": "Running",
    "department": "Legal & Compliance",
    "jobPosition": "Legal & Compliance Counsel",
    "workingScheduleId": "ws-8",
    "workingSchedule": "Consulting Flexible 30 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Riya Sengupta in Legal & Compliance."
  },
  {
    "id": "con-21",
    "customId": "con-21",
    "contractNumber": "CON/2026/0021",
    "employeeId": "emp-21",
    "employeeName": "Kunal Roy",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 185000,
    "status": "Running",
    "department": "Engineering",
    "jobPosition": "Cloud Infrastructure Architect",
    "workingScheduleId": "ws-7",
    "workingSchedule": "DevOps 24x7 Rota",
    "structureType": "Tech Specialist",
    "notes": "Standard full-time active agreement for Kunal Roy in Engineering."
  },
  {
    "id": "con-22",
    "customId": "con-22",
    "contractNumber": "CON/2026/0022",
    "employeeId": "emp-22",
    "employeeName": "Diya Bansal",
    "startDate": "2025-07-01",
    "endDate": "",
    "duration": "Ongoing (Started 2025-07-01)",
    "wage": 62000,
    "status": "Running",
    "department": "Finance & Payroll",
    "jobPosition": "Accounts Payable Executive",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Diya Bansal in Finance & Payroll."
  },
  {
    "id": "con-23",
    "customId": "con-23",
    "contractNumber": "CON/2026/0023",
    "employeeId": "emp-23",
    "employeeName": "Arjun Singhania",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 90000,
    "status": "Running",
    "department": "Product Management",
    "jobPosition": "UI/UX Designer",
    "workingScheduleId": "ws-2",
    "workingSchedule": "Tech Flexible 35 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Arjun Singhania in Product Management."
  },
  {
    "id": "con-24",
    "customId": "con-24",
    "contractNumber": "CON/2026/0024",
    "employeeId": "emp-24",
    "employeeName": "Shreya Ghoshal",
    "startDate": "2025-07-01",
    "endDate": "",
    "duration": "Ongoing (Started 2025-07-01)",
    "wage": 75000,
    "status": "Running",
    "department": "Marketing & Growth",
    "jobPosition": "Content Strategist",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Shreya Ghoshal in Marketing & Growth."
  },
  {
    "id": "con-25",
    "customId": "con-25",
    "contractNumber": "CON/2026/0025",
    "employeeId": "emp-25",
    "employeeName": "Varun Grover",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 92000,
    "status": "Running",
    "department": "Engineering",
    "jobPosition": "Full Stack Engineer",
    "workingScheduleId": "ws-2",
    "workingSchedule": "Tech Flexible 35 Hours",
    "structureType": "Tech Specialist",
    "notes": "Standard full-time active agreement for Varun Grover in Engineering."
  },
  {
    "id": "con-26",
    "customId": "con-26",
    "contractNumber": "CON/2026/0026",
    "employeeId": "emp-26",
    "employeeName": "Kriti Sanon",
    "startDate": "2025-07-01",
    "endDate": "",
    "duration": "Ongoing (Started 2025-07-01)",
    "wage": 72000,
    "status": "Running",
    "department": "Human Resources",
    "jobPosition": "Employee Experience Specialist",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Kriti Sanon in Human Resources."
  },
  {
    "id": "con-27",
    "customId": "con-27",
    "contractNumber": "CON/2026/0027",
    "employeeId": "emp-27",
    "employeeName": "Nikhil Chinapa",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 65000,
    "status": "Running",
    "department": "Customer Success",
    "jobPosition": "Technical Support Engineer",
    "workingScheduleId": "ws-4",
    "workingSchedule": "Extended Support 45 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Nikhil Chinapa in Customer Success."
  },
  {
    "id": "con-28",
    "customId": "con-28",
    "contractNumber": "CON/2026/0028",
    "employeeId": "emp-28",
    "employeeName": "Alia Bhattacharya",
    "startDate": "2025-07-01",
    "endDate": "",
    "duration": "Ongoing (Started 2025-07-01)",
    "wage": 98000,
    "status": "Running",
    "department": "Engineering",
    "jobPosition": "Data Engineer",
    "workingScheduleId": "ws-2",
    "workingSchedule": "Tech Flexible 35 Hours",
    "structureType": "Tech Specialist",
    "notes": "Standard full-time active agreement for Alia Bhattacharya in Engineering."
  },
  {
    "id": "con-29",
    "customId": "con-29",
    "contractNumber": "CON/2026/0029",
    "employeeId": "emp-29",
    "employeeName": "Gautam Gambhir",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 85000,
    "status": "Running",
    "department": "Operations & Admin",
    "jobPosition": "Facilities Manager",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Gautam Gambhir in Operations & Admin."
  },
  {
    "id": "con-30",
    "customId": "con-30",
    "contractNumber": "CON/2026/0030",
    "employeeId": "emp-30",
    "employeeName": "Simran Walia",
    "startDate": "2025-07-01",
    "endDate": "",
    "duration": "Ongoing (Started 2025-07-01)",
    "wage": 78000,
    "status": "Running",
    "department": "Quality Assurance",
    "jobPosition": "Automation QA Specialist",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Simran Walia in Quality Assurance."
  },
  {
    "id": "con-31",
    "customId": "con-31",
    "contractNumber": "CON/2026/0031",
    "employeeId": "emp-31",
    "employeeName": "Tarun Khanna",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 118000,
    "status": "Running",
    "department": "Finance & Payroll",
    "jobPosition": "Tax & Regulatory Specialist",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Tarun Khanna in Finance & Payroll."
  },
  {
    "id": "con-32",
    "customId": "con-32",
    "contractNumber": "CON/2026/0032",
    "employeeId": "emp-32",
    "employeeName": "Natasha Poonawalla",
    "startDate": "2025-07-01",
    "endDate": "",
    "duration": "Ongoing (Started 2025-07-01)",
    "wage": 60000,
    "status": "Running",
    "department": "Sales & Business Dev",
    "jobPosition": "Inside Sales Representative",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Sales Commission",
    "notes": "Standard full-time active agreement for Natasha Poonawalla in Sales & Business Dev."
  },
  {
    "id": "con-33",
    "customId": "con-33",
    "contractNumber": "CON/2026/0033",
    "employeeId": "emp-33",
    "employeeName": "Pranav Anand",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 84000,
    "status": "Running",
    "department": "Engineering",
    "jobPosition": "Mobile App Developer",
    "workingScheduleId": "ws-2",
    "workingSchedule": "Tech Flexible 35 Hours",
    "structureType": "Tech Specialist",
    "notes": "Standard full-time active agreement for Pranav Anand in Engineering."
  },
  {
    "id": "con-34",
    "customId": "con-34",
    "contractNumber": "CON/2026/0034",
    "employeeId": "emp-34",
    "employeeName": "Swati Piramal",
    "startDate": "2025-07-01",
    "endDate": "",
    "duration": "Ongoing (Started 2025-07-01)",
    "wage": 68000,
    "status": "Running",
    "department": "Marketing & Growth",
    "jobPosition": "Digital Media Specialist",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Swati Piramal in Marketing & Growth."
  },
  {
    "id": "con-35",
    "customId": "con-35",
    "contractNumber": "CON/2026/0035",
    "employeeId": "emp-35",
    "employeeName": "Harsh Vardhan",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 110000,
    "status": "Running",
    "department": "Engineering",
    "jobPosition": "Security & SecOps Analyst",
    "workingScheduleId": "ws-7",
    "workingSchedule": "DevOps 24x7 Rota",
    "structureType": "Tech Specialist",
    "notes": "Standard full-time active agreement for Harsh Vardhan in Engineering."
  },
  {
    "id": "con-36",
    "customId": "con-36",
    "contractNumber": "CON/2026/0036",
    "employeeId": "emp-36",
    "employeeName": "Lavanya Sundaram",
    "startDate": "2025-07-01",
    "endDate": "",
    "duration": "Ongoing (Started 2025-07-01)",
    "wage": 74000,
    "status": "Running",
    "department": "Finance & Payroll",
    "jobPosition": "Treasury Analyst",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Lavanya Sundaram in Finance & Payroll."
  },
  {
    "id": "con-37",
    "customId": "con-37",
    "contractNumber": "CON/2026/0037",
    "employeeId": "emp-37",
    "employeeName": "Rishi Kapoor",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 78000,
    "status": "Running",
    "department": "Product Management",
    "jobPosition": "Associate Product Manager",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Rishi Kapoor in Product Management."
  },
  {
    "id": "con-38",
    "customId": "con-38",
    "contractNumber": "CON/2026/0038",
    "employeeId": "emp-38",
    "employeeName": "Avani Chaturvedi",
    "startDate": "2025-07-01",
    "endDate": "",
    "duration": "Ongoing (Started 2025-07-01)",
    "wage": 96000,
    "status": "Running",
    "department": "Engineering",
    "jobPosition": "Systems Reliability Engineer",
    "workingScheduleId": "ws-7",
    "workingSchedule": "DevOps 24x7 Rota",
    "structureType": "Tech Specialist",
    "notes": "Standard full-time active agreement for Avani Chaturvedi in Engineering."
  },
  {
    "id": "con-39",
    "customId": "con-39",
    "contractNumber": "CON/2026/0039",
    "employeeId": "emp-39",
    "employeeName": "Mohit Chauhan",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 135000,
    "status": "Running",
    "department": "Sales & Business Dev",
    "jobPosition": "Regional Sales Manager - West",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Sales Commission",
    "notes": "Standard full-time active agreement for Mohit Chauhan in Sales & Business Dev."
  },
  {
    "id": "con-40",
    "customId": "con-40",
    "contractNumber": "CON/2026/0040",
    "employeeId": "emp-40",
    "employeeName": "Sunita Narain",
    "startDate": "2025-07-01",
    "endDate": "",
    "duration": "Ongoing (Started 2025-07-01)",
    "wage": 66000,
    "status": "Running",
    "department": "Operations & Admin",
    "jobPosition": "Procurement Executive",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Sunita Narain in Operations & Admin."
  },
  {
    "id": "con-41",
    "customId": "con-41",
    "contractNumber": "CON/2026/0041",
    "employeeId": "emp-41",
    "employeeName": "Rahul Dravid",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 195000,
    "status": "Running",
    "department": "Engineering",
    "jobPosition": "Engineering Manager",
    "workingScheduleId": "ws-2",
    "workingSchedule": "Tech Flexible 35 Hours",
    "structureType": "Executive Leadership",
    "notes": "Standard full-time active agreement for Rahul Dravid in Engineering."
  },
  {
    "id": "con-42",
    "customId": "con-42",
    "contractNumber": "CON/2026/0042",
    "employeeId": "emp-42",
    "employeeName": "Fatima Sana",
    "startDate": "2025-07-01",
    "endDate": "",
    "duration": "Ongoing (Started 2025-07-01)",
    "wage": 54000,
    "status": "Running",
    "department": "Customer Success",
    "jobPosition": "Customer Support Specialist",
    "workingScheduleId": "ws-4",
    "workingSchedule": "Extended Support 45 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Fatima Sana in Customer Success."
  },
  {
    "id": "con-43",
    "customId": "con-43",
    "contractNumber": "CON/2026/0043",
    "employeeId": "emp-43",
    "employeeName": "Chetan Bhagat",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 64000,
    "status": "Running",
    "department": "Marketing & Growth",
    "jobPosition": "Copywriter & Brand Strategist",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Chetan Bhagat in Marketing & Growth."
  },
  {
    "id": "con-44",
    "customId": "con-44",
    "contractNumber": "CON/2026/0044",
    "employeeId": "emp-44",
    "employeeName": "Deepinder Goyal",
    "startDate": "2025-07-01",
    "endDate": "",
    "duration": "Ongoing (Started 2025-07-01)",
    "wage": 165000,
    "status": "Running",
    "department": "Engineering",
    "jobPosition": "Staff Software Engineer",
    "workingScheduleId": "ws-2",
    "workingSchedule": "Tech Flexible 35 Hours",
    "structureType": "Tech Specialist",
    "notes": "Standard full-time active agreement for Deepinder Goyal in Engineering."
  },
  {
    "id": "con-45",
    "customId": "con-45",
    "contractNumber": "CON/2026/0045",
    "employeeId": "emp-45",
    "employeeName": "Falguni Nayar",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 260000,
    "status": "Running",
    "department": "Finance & Payroll",
    "jobPosition": "Chief Financial Officer",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Executive Leadership",
    "notes": "Standard full-time active agreement for Falguni Nayar in Finance & Payroll."
  },
  {
    "id": "con-46",
    "customId": "con-46",
    "contractNumber": "CON/2026/0046",
    "employeeId": "emp-46",
    "employeeName": "Jaspreet Bumrah",
    "startDate": "2025-07-01",
    "endDate": "",
    "duration": "Ongoing (Started 2025-07-01)",
    "wage": 86000,
    "status": "Running",
    "department": "Quality Assurance",
    "jobPosition": "Performance Testing Engineer",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Jaspreet Bumrah in Quality Assurance."
  },
  {
    "id": "con-47",
    "customId": "con-47",
    "contractNumber": "CON/2026/0047",
    "employeeId": "emp-47",
    "employeeName": "Vidya Balan",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 82000,
    "status": "Running",
    "department": "Human Resources",
    "jobPosition": "People Operations Partner",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Vidya Balan in Human Resources."
  },
  {
    "id": "con-48",
    "customId": "con-48",
    "contractNumber": "CON/2026/0048",
    "employeeId": "emp-48",
    "employeeName": "Sachin Tendulkar",
    "startDate": "2025-07-01",
    "endDate": "",
    "duration": "Ongoing (Started 2025-07-01)",
    "wage": 210000,
    "status": "Running",
    "department": "Sales & Business Dev",
    "jobPosition": "Director of Strategic Partnerships",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Executive Leadership",
    "notes": "Standard full-time active agreement for Sachin Tendulkar in Sales & Business Dev."
  },
  {
    "id": "con-49",
    "customId": "con-49",
    "contractNumber": "CON/2026/0049",
    "employeeId": "emp-49",
    "employeeName": "Mithali Raj",
    "startDate": "2026-01-01",
    "endDate": "",
    "duration": "Ongoing (Started 2026-01-01)",
    "wage": 90000,
    "status": "Running",
    "department": "Operations & Admin",
    "jobPosition": "Logistics & Facilities Lead",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Mithali Raj in Operations & Admin."
  },
  {
    "id": "con-50",
    "customId": "con-50",
    "contractNumber": "CON/2026/0050",
    "employeeId": "emp-50",
    "employeeName": "Boman Irani",
    "startDate": "2025-07-01",
    "endDate": "",
    "duration": "Ongoing (Started 2025-07-01)",
    "wage": 58000,
    "status": "Running",
    "department": "Operations & Admin",
    "jobPosition": "Internal IT Support Specialist",
    "workingScheduleId": "ws-1",
    "workingSchedule": "Standard 40 Hours",
    "structureType": "Regular Salary",
    "notes": "Standard full-time active agreement for Boman Irani in Operations & Admin."
  }
];

export const SEED_TIMEOFF_TYPES = [
  {
    "id": "tot-1",
    "name": "Paid Time Off",
    "unit": "Days",
    "allocation": "Required",
    "approval": "Manager",
    "status": "Active",
    "payrollEntry": "Leave Work Entry",
    "displayColor": "Green",
    "notes": "Standard annual paid leave with allocation grant."
  },
  {
    "id": "tot-2",
    "name": "Sick Leave",
    "unit": "Days",
    "allocation": "No",
    "approval": "Manager",
    "status": "Active",
    "payrollEntry": "Leave Work Entry",
    "displayColor": "Amber",
    "notes": "Medical emergency leave approved directly by manager."
  },
  {
    "id": "tot-3",
    "name": "Comp Off",
    "unit": "Hours",
    "allocation": "Required",
    "approval": "Officer",
    "status": "Active",
    "payrollEntry": "Compensatory Overtime",
    "displayColor": "Blue",
    "notes": "Granted for weekend deployment or emergency coverage."
  },
  {
    "id": "tot-4",
    "name": "Casual Leave",
    "unit": "Days",
    "allocation": "Required",
    "approval": "Manager",
    "status": "Active",
    "payrollEntry": "Leave Work Entry",
    "displayColor": "Purple",
    "notes": "Short-notice personal affairs leave."
  },
  {
    "id": "tot-5",
    "name": "Maternity / Paternity Leave",
    "unit": "Days",
    "allocation": "Required",
    "approval": "HR",
    "status": "Active",
    "payrollEntry": "Parental Leave",
    "displayColor": "Green",
    "notes": "Statutory parental leave with HR verification."
  },
  {
    "id": "tot-6",
    "name": "Bereavement Leave",
    "unit": "Days",
    "allocation": "No",
    "approval": "Manager",
    "status": "Active",
    "payrollEntry": "Leave Work Entry",
    "displayColor": "Amber",
    "notes": "Compassionate leave for family loss."
  },
  {
    "id": "tot-7",
    "name": "Sabbatical / Unpaid Leave",
    "unit": "Days",
    "allocation": "Required",
    "approval": "HR",
    "status": "Active",
    "payrollEntry": "Unpaid Leave Entry",
    "displayColor": "Red",
    "notes": "Long-term unpaid career break approved by executive HR."
  }
];

export const SEED_ALLOCATIONS = [
  {
    "id": "alc-1",
    "customId": "alc-1",
    "employeeId": "emp-1",
    "employeeName": "Aarav Mehta",
    "type": "Paid Time Off",
    "allocated": 20,
    "taken": 0,
    "remaining": 20,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Sara Khan",
    "description": "Paid Time Off balance grant for calendar year 2026.",
    "deductionLog": []
  },
  {
    "id": "alc-2",
    "customId": "alc-2",
    "employeeId": "emp-2",
    "employeeName": "Sara Khan",
    "type": "Sick Leave",
    "allocated": 12,
    "taken": 1,
    "remaining": 11,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Falguni Nayar",
    "description": "Sick Leave balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-2",
        "duration": 1,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-3",
    "customId": "alc-3",
    "employeeId": "emp-3",
    "employeeName": "John Dsouza",
    "type": "Comp Off",
    "allocated": 4,
    "taken": 2,
    "remaining": 2,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Rahul Dravid",
    "description": "Comp Off balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-3",
        "duration": 2,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-4",
    "customId": "alc-4",
    "employeeId": "emp-4",
    "employeeName": "Neha Patel",
    "type": "Casual Leave",
    "allocated": 20,
    "taken": 3,
    "remaining": 17,
    "unit": "Days",
    "status": "To Approve",
    "validity": "2026 Annual Balance",
    "approver": "Sara Khan",
    "description": "Casual Leave balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-4",
        "duration": 3,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-5",
    "customId": "alc-5",
    "employeeId": "emp-5",
    "employeeName": "Rohan Patel",
    "type": "Paid Time Off",
    "allocated": 20,
    "taken": 4,
    "remaining": 16,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Rahul Dravid",
    "description": "Paid Time Off balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-5",
        "duration": 4,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-6",
    "customId": "alc-6",
    "employeeId": "emp-6",
    "employeeName": "Vikram Malhotra",
    "type": "Sick Leave",
    "allocated": 12,
    "taken": 0,
    "remaining": 12,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Rahul Dravid",
    "description": "Sick Leave balance grant for calendar year 2026.",
    "deductionLog": []
  },
  {
    "id": "alc-7",
    "customId": "alc-7",
    "employeeId": "emp-7",
    "employeeName": "Priya Sharma",
    "type": "Comp Off",
    "allocated": 4,
    "taken": 1,
    "remaining": 3,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Aarav Mehta",
    "description": "Comp Off balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-7",
        "duration": 1,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-8",
    "customId": "alc-8",
    "employeeId": "emp-8",
    "employeeName": "Aditya Kapoor",
    "type": "Casual Leave",
    "allocated": 20,
    "taken": 2,
    "remaining": 18,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Vikram Malhotra",
    "description": "Casual Leave balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-8",
        "duration": 2,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-9",
    "customId": "alc-9",
    "employeeId": "emp-9",
    "employeeName": "Ananya Iyer",
    "type": "Paid Time Off",
    "allocated": 20,
    "taken": 3,
    "remaining": 17,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Aarav Mehta",
    "description": "Paid Time Off balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-9",
        "duration": 3,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-10",
    "customId": "alc-10",
    "employeeId": "emp-10",
    "employeeName": "Rajesh Nair",
    "type": "Sick Leave",
    "allocated": 12,
    "taken": 4,
    "remaining": 8,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Falguni Nayar",
    "description": "Sick Leave balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-10",
        "duration": 4,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-11",
    "customId": "alc-11",
    "employeeId": "emp-11",
    "employeeName": "Sneha Joshi",
    "type": "Comp Off",
    "allocated": 4,
    "taken": 0,
    "remaining": 4,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Rajesh Nair",
    "description": "Comp Off balance grant for calendar year 2026.",
    "deductionLog": []
  },
  {
    "id": "alc-12",
    "customId": "alc-12",
    "employeeId": "emp-12",
    "employeeName": "Kabir Deshmukh",
    "type": "Casual Leave",
    "allocated": 20,
    "taken": 1,
    "remaining": 19,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Sara Khan",
    "description": "Casual Leave balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-12",
        "duration": 1,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-13",
    "customId": "alc-13",
    "employeeId": "emp-13",
    "employeeName": "Meera Sen",
    "type": "Paid Time Off",
    "allocated": 20,
    "taken": 2,
    "remaining": 18,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Aditya Kapoor",
    "description": "Paid Time Off balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-13",
        "duration": 2,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-14",
    "customId": "alc-14",
    "employeeId": "emp-14",
    "employeeName": "Devendra Rao",
    "type": "Sick Leave",
    "allocated": 12,
    "taken": 3,
    "remaining": 9,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Falguni Nayar",
    "description": "Sick Leave balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-14",
        "duration": 3,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-15",
    "customId": "alc-15",
    "employeeId": "emp-15",
    "employeeName": "Ishaan Bhat",
    "type": "Comp Off",
    "allocated": 4,
    "taken": 4,
    "remaining": 0,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Vikram Malhotra",
    "description": "Comp Off balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-15",
        "duration": 4,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-16",
    "customId": "alc-16",
    "employeeId": "emp-16",
    "employeeName": "Tanvi Kulkarni",
    "type": "Casual Leave",
    "allocated": 20,
    "taken": 0,
    "remaining": 20,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Rahul Dravid",
    "description": "Casual Leave balance grant for calendar year 2026.",
    "deductionLog": []
  },
  {
    "id": "alc-17",
    "customId": "alc-17",
    "employeeId": "emp-17",
    "employeeName": "Siddharth Varma",
    "type": "Paid Time Off",
    "allocated": 20,
    "taken": 1,
    "remaining": 19,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Aditya Kapoor",
    "description": "Paid Time Off balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-17",
        "duration": 1,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-18",
    "customId": "alc-18",
    "employeeId": "emp-18",
    "employeeName": "Pooja Hegde",
    "type": "Sick Leave",
    "allocated": 12,
    "taken": 2,
    "remaining": 10,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Neha Patel",
    "description": "Sick Leave balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-18",
        "duration": 2,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-19",
    "customId": "alc-19",
    "employeeId": "emp-19",
    "employeeName": "Manav Reddy",
    "type": "Comp Off",
    "allocated": 4,
    "taken": 3,
    "remaining": 1,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Rajesh Nair",
    "description": "Comp Off balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-19",
        "duration": 3,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-20",
    "customId": "alc-20",
    "employeeId": "emp-20",
    "employeeName": "Riya Sengupta",
    "type": "Casual Leave",
    "allocated": 20,
    "taken": 4,
    "remaining": 16,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Sara Khan",
    "description": "Casual Leave balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-20",
        "duration": 4,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-21",
    "customId": "alc-21",
    "employeeId": "emp-21",
    "employeeName": "Kunal Roy",
    "type": "Paid Time Off",
    "allocated": 20,
    "taken": 0,
    "remaining": 20,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Vikram Malhotra",
    "description": "Paid Time Off balance grant for calendar year 2026.",
    "deductionLog": []
  },
  {
    "id": "alc-22",
    "customId": "alc-22",
    "employeeId": "emp-22",
    "employeeName": "Diya Bansal",
    "type": "Sick Leave",
    "allocated": 12,
    "taken": 1,
    "remaining": 11,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Ananya Iyer",
    "description": "Sick Leave balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-22",
        "duration": 1,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-23",
    "customId": "alc-23",
    "employeeId": "emp-23",
    "employeeName": "Arjun Singhania",
    "type": "Comp Off",
    "allocated": 4,
    "taken": 2,
    "remaining": 2,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Priya Sharma",
    "description": "Comp Off balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-23",
        "duration": 2,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-24",
    "customId": "alc-24",
    "employeeId": "emp-24",
    "employeeName": "Shreya Ghoshal",
    "type": "Casual Leave",
    "allocated": 20,
    "taken": 3,
    "remaining": 17,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Sneha Joshi",
    "description": "Casual Leave balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-24",
        "duration": 3,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-25",
    "customId": "alc-25",
    "employeeId": "emp-25",
    "employeeName": "Varun Grover",
    "type": "Paid Time Off",
    "allocated": 20,
    "taken": 4,
    "remaining": 16,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Aditya Kapoor",
    "description": "Paid Time Off balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-25",
        "duration": 4,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-26",
    "customId": "alc-26",
    "employeeId": "emp-26",
    "employeeName": "Kriti Sanon",
    "type": "Sick Leave",
    "allocated": 12,
    "taken": 0,
    "remaining": 12,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Sara Khan",
    "description": "Sick Leave balance grant for calendar year 2026.",
    "deductionLog": []
  },
  {
    "id": "alc-27",
    "customId": "alc-27",
    "employeeId": "emp-27",
    "employeeName": "Nikhil Chinapa",
    "type": "Comp Off",
    "allocated": 4,
    "taken": 1,
    "remaining": 3,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Kabir Deshmukh",
    "description": "Comp Off balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-27",
        "duration": 1,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-28",
    "customId": "alc-28",
    "employeeId": "emp-28",
    "employeeName": "Alia Bhattacharya",
    "type": "Casual Leave",
    "allocated": 20,
    "taken": 2,
    "remaining": 18,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Vikram Malhotra",
    "description": "Casual Leave balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-28",
        "duration": 2,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-29",
    "customId": "alc-29",
    "employeeId": "emp-29",
    "employeeName": "Gautam Gambhir",
    "type": "Paid Time Off",
    "allocated": 20,
    "taken": 3,
    "remaining": 17,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Devendra Rao",
    "description": "Paid Time Off balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-29",
        "duration": 3,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-30",
    "customId": "alc-30",
    "employeeId": "emp-30",
    "employeeName": "Simran Walia",
    "type": "Sick Leave",
    "allocated": 12,
    "taken": 4,
    "remaining": 8,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Tanvi Kulkarni",
    "description": "Sick Leave balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-30",
        "duration": 4,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-31",
    "customId": "alc-31",
    "employeeId": "emp-31",
    "employeeName": "Tarun Khanna",
    "type": "Comp Off",
    "allocated": 4,
    "taken": 0,
    "remaining": 4,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Aarav Mehta",
    "description": "Comp Off balance grant for calendar year 2026.",
    "deductionLog": []
  },
  {
    "id": "alc-32",
    "customId": "alc-32",
    "employeeId": "emp-32",
    "employeeName": "Natasha Poonawalla",
    "type": "Casual Leave",
    "allocated": 20,
    "taken": 1,
    "remaining": 19,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Manav Reddy",
    "description": "Casual Leave balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-32",
        "duration": 1,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-33",
    "customId": "alc-33",
    "employeeId": "emp-33",
    "employeeName": "Pranav Anand",
    "type": "Paid Time Off",
    "allocated": 20,
    "taken": 2,
    "remaining": 18,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Aditya Kapoor",
    "description": "Paid Time Off balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-33",
        "duration": 2,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-34",
    "customId": "alc-34",
    "employeeId": "emp-34",
    "employeeName": "Swati Piramal",
    "type": "Sick Leave",
    "allocated": 12,
    "taken": 3,
    "remaining": 9,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Sneha Joshi",
    "description": "Sick Leave balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-34",
        "duration": 3,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-35",
    "customId": "alc-35",
    "employeeId": "emp-35",
    "employeeName": "Harsh Vardhan",
    "type": "Comp Off",
    "allocated": 4,
    "taken": 4,
    "remaining": 0,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Vikram Malhotra",
    "description": "Comp Off balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-35",
        "duration": 4,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-36",
    "customId": "alc-36",
    "employeeId": "emp-36",
    "employeeName": "Lavanya Sundaram",
    "type": "Casual Leave",
    "allocated": 20,
    "taken": 0,
    "remaining": 20,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Ananya Iyer",
    "description": "Casual Leave balance grant for calendar year 2026.",
    "deductionLog": []
  },
  {
    "id": "alc-37",
    "customId": "alc-37",
    "employeeId": "emp-37",
    "employeeName": "Rishi Kapoor",
    "type": "Paid Time Off",
    "allocated": 20,
    "taken": 1,
    "remaining": 19,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Priya Sharma",
    "description": "Paid Time Off balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-37",
        "duration": 1,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-38",
    "customId": "alc-38",
    "employeeId": "emp-38",
    "employeeName": "Avani Chaturvedi",
    "type": "Sick Leave",
    "allocated": 12,
    "taken": 2,
    "remaining": 10,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Ishaan Bhat",
    "description": "Sick Leave balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-38",
        "duration": 2,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-39",
    "customId": "alc-39",
    "employeeId": "emp-39",
    "employeeName": "Mohit Chauhan",
    "type": "Comp Off",
    "allocated": 4,
    "taken": 3,
    "remaining": 1,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Rajesh Nair",
    "description": "Comp Off balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-39",
        "duration": 3,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-40",
    "customId": "alc-40",
    "employeeId": "emp-40",
    "employeeName": "Sunita Narain",
    "type": "Casual Leave",
    "allocated": 20,
    "taken": 4,
    "remaining": 16,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Devendra Rao",
    "description": "Casual Leave balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-40",
        "duration": 4,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-41",
    "customId": "alc-41",
    "employeeId": "emp-41",
    "employeeName": "Rahul Dravid",
    "type": "Paid Time Off",
    "allocated": 20,
    "taken": 0,
    "remaining": 20,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Sara Khan",
    "description": "Paid Time Off balance grant for calendar year 2026.",
    "deductionLog": []
  },
  {
    "id": "alc-42",
    "customId": "alc-42",
    "employeeId": "emp-42",
    "employeeName": "Fatima Sana",
    "type": "Sick Leave",
    "allocated": 12,
    "taken": 1,
    "remaining": 11,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Kabir Deshmukh",
    "description": "Sick Leave balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-42",
        "duration": 1,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-43",
    "customId": "alc-43",
    "employeeId": "emp-43",
    "employeeName": "Chetan Bhagat",
    "type": "Comp Off",
    "allocated": 4,
    "taken": 2,
    "remaining": 2,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Sneha Joshi",
    "description": "Comp Off balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-43",
        "duration": 2,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-44",
    "customId": "alc-44",
    "employeeId": "emp-44",
    "employeeName": "Deepinder Goyal",
    "type": "Casual Leave",
    "allocated": 20,
    "taken": 3,
    "remaining": 17,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Rahul Dravid",
    "description": "Casual Leave balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-44",
        "duration": 3,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-45",
    "customId": "alc-45",
    "employeeId": "emp-45",
    "employeeName": "Falguni Nayar",
    "type": "Paid Time Off",
    "allocated": 20,
    "taken": 4,
    "remaining": 16,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Sara Khan",
    "description": "Paid Time Off balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-45",
        "duration": 4,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-46",
    "customId": "alc-46",
    "employeeId": "emp-46",
    "employeeName": "Jaspreet Bumrah",
    "type": "Sick Leave",
    "allocated": 12,
    "taken": 0,
    "remaining": 12,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Tanvi Kulkarni",
    "description": "Sick Leave balance grant for calendar year 2026.",
    "deductionLog": []
  },
  {
    "id": "alc-47",
    "customId": "alc-47",
    "employeeId": "emp-47",
    "employeeName": "Vidya Balan",
    "type": "Comp Off",
    "allocated": 4,
    "taken": 1,
    "remaining": 3,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Sara Khan",
    "description": "Comp Off balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-47",
        "duration": 1,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-48",
    "customId": "alc-48",
    "employeeId": "emp-48",
    "employeeName": "Sachin Tendulkar",
    "type": "Casual Leave",
    "allocated": 20,
    "taken": 2,
    "remaining": 18,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Rajesh Nair",
    "description": "Casual Leave balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-48",
        "duration": 2,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-49",
    "customId": "alc-49",
    "employeeId": "emp-49",
    "employeeName": "Mithali Raj",
    "type": "Paid Time Off",
    "allocated": 20,
    "taken": 3,
    "remaining": 17,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Devendra Rao",
    "description": "Paid Time Off balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-49",
        "duration": 3,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  },
  {
    "id": "alc-50",
    "customId": "alc-50",
    "employeeId": "emp-50",
    "employeeName": "Boman Irani",
    "type": "Sick Leave",
    "allocated": 12,
    "taken": 4,
    "remaining": 8,
    "unit": "Days",
    "status": "Approved",
    "validity": "2026 Annual Balance",
    "approver": "Devendra Rao",
    "description": "Sick Leave balance grant for calendar year 2026.",
    "deductionLog": [
      {
        "requestId": "req-50",
        "duration": 4,
        "date": "15-Aug-2026",
        "note": "Personal leave approved"
      }
    ]
  }
];

export const SEED_TIMEOFF_REQUESTS = [
  {
    "id": "req-1",
    "customId": "req-1",
    "employeeId": "emp-1",
    "employeeName": "Aarav Mehta",
    "type": "Paid Time Off",
    "startDate": "2026-09-10",
    "endDate": "2026-09-10",
    "duration": 1,
    "status": "To Approve",
    "approver": "Sara Khan",
    "allocationUsed": "Paid Time Off (2026 Annual Balance)",
    "reason": "Family vacation and travel"
  },
  {
    "id": "req-2",
    "customId": "req-2",
    "employeeId": "emp-2",
    "employeeName": "Sara Khan",
    "type": "Sick Leave",
    "startDate": "2026-09-11",
    "endDate": "2026-09-12",
    "duration": 2,
    "status": "Approved",
    "approver": "Falguni Nayar",
    "allocationUsed": "Sick Leave (2026 Annual Balance)",
    "reason": "Personal medical consultation and rest"
  },
  {
    "id": "req-3",
    "customId": "req-3",
    "employeeId": "emp-3",
    "employeeName": "John Dsouza",
    "type": "Comp Off",
    "startDate": "2026-09-12",
    "endDate": "2026-09-14",
    "duration": 3,
    "status": "Approved",
    "approver": "Rahul Dravid",
    "allocationUsed": "Comp Off (2026 Annual Balance)",
    "reason": "Weekend release overtime comp-off"
  },
  {
    "id": "req-4",
    "customId": "req-4",
    "employeeId": "emp-4",
    "employeeName": "Neha Patel",
    "type": "Casual Leave",
    "startDate": "2026-09-13",
    "endDate": "2026-09-13",
    "duration": 1,
    "status": "Approved",
    "approver": "Sara Khan",
    "allocationUsed": "Casual Leave (2026 Annual Balance)",
    "reason": "Home relocation and settlement"
  },
  {
    "id": "req-5",
    "customId": "req-5",
    "employeeId": "emp-5",
    "employeeName": "Rohan Patel",
    "type": "Paid Time Off",
    "startDate": "2026-09-14",
    "endDate": "2026-09-15",
    "duration": 2,
    "status": "Approved",
    "approver": "Rahul Dravid",
    "allocationUsed": "Paid Time Off (2026 Annual Balance)",
    "reason": "Attending family wedding ceremony"
  },
  {
    "id": "req-6",
    "customId": "req-6",
    "employeeId": "emp-6",
    "employeeName": "Vikram Malhotra",
    "type": "Sick Leave",
    "startDate": "2026-09-15",
    "endDate": "2026-09-17",
    "duration": 3,
    "status": "Approved",
    "approver": "Rahul Dravid",
    "allocationUsed": "Sick Leave (2026 Annual Balance)",
    "reason": "Child school admission and parent meeting"
  },
  {
    "id": "req-7",
    "customId": "req-7",
    "employeeId": "emp-7",
    "employeeName": "Priya Sharma",
    "type": "Comp Off",
    "startDate": "2026-09-16",
    "endDate": "2026-09-16",
    "duration": 1,
    "status": "To Approve",
    "approver": "Aarav Mehta",
    "allocationUsed": "Comp Off (2026 Annual Balance)",
    "reason": "Dental surgery and medical appointment"
  },
  {
    "id": "req-8",
    "customId": "req-8",
    "employeeId": "emp-8",
    "employeeName": "Aditya Kapoor",
    "type": "Casual Leave",
    "startDate": "2026-09-17",
    "endDate": "2026-09-18",
    "duration": 2,
    "status": "Approved",
    "approver": "Vikram Malhotra",
    "allocationUsed": "Casual Leave (2026 Annual Balance)",
    "reason": "Emergency home maintenance"
  },
  {
    "id": "req-9",
    "customId": "req-9",
    "employeeId": "emp-9",
    "employeeName": "Ananya Iyer",
    "type": "Paid Time Off",
    "startDate": "2026-09-18",
    "endDate": "2026-09-20",
    "duration": 3,
    "status": "Approved",
    "approver": "Aarav Mehta",
    "allocationUsed": "Paid Time Off (2026 Annual Balance)",
    "reason": "Severe fever and doctor advised rest"
  },
  {
    "id": "req-10",
    "customId": "req-10",
    "employeeId": "emp-10",
    "employeeName": "Rajesh Nair",
    "type": "Sick Leave",
    "startDate": "2026-09-19",
    "endDate": "2026-09-19",
    "duration": 1,
    "status": "Approved",
    "approver": "Falguni Nayar",
    "allocationUsed": "Sick Leave (2026 Annual Balance)",
    "reason": "Festive celebration with extended family"
  },
  {
    "id": "req-11",
    "customId": "req-11",
    "employeeId": "emp-11",
    "employeeName": "Sneha Joshi",
    "type": "Comp Off",
    "startDate": "2026-09-20",
    "endDate": "2026-09-21",
    "duration": 2,
    "status": "Approved",
    "approver": "Rajesh Nair",
    "allocationUsed": "Comp Off (2026 Annual Balance)",
    "reason": "Family vacation and travel"
  },
  {
    "id": "req-12",
    "customId": "req-12",
    "employeeId": "emp-12",
    "employeeName": "Kabir Deshmukh",
    "type": "Casual Leave",
    "startDate": "2026-09-21",
    "endDate": "2026-09-23",
    "duration": 3,
    "status": "Approved",
    "approver": "Sara Khan",
    "allocationUsed": "Casual Leave (2026 Annual Balance)",
    "reason": "Personal medical consultation and rest"
  },
  {
    "id": "req-13",
    "customId": "req-13",
    "employeeId": "emp-13",
    "employeeName": "Meera Sen",
    "type": "Paid Time Off",
    "startDate": "2026-09-22",
    "endDate": "2026-09-22",
    "duration": 1,
    "status": "To Approve",
    "approver": "Aditya Kapoor",
    "allocationUsed": "Paid Time Off (2026 Annual Balance)",
    "reason": "Weekend release overtime comp-off"
  },
  {
    "id": "req-14",
    "customId": "req-14",
    "employeeId": "emp-14",
    "employeeName": "Devendra Rao",
    "type": "Sick Leave",
    "startDate": "2026-09-23",
    "endDate": "2026-09-24",
    "duration": 2,
    "status": "Approved",
    "approver": "Falguni Nayar",
    "allocationUsed": "Sick Leave (2026 Annual Balance)",
    "reason": "Home relocation and settlement"
  },
  {
    "id": "req-15",
    "customId": "req-15",
    "employeeId": "emp-15",
    "employeeName": "Ishaan Bhat",
    "type": "Comp Off",
    "startDate": "2026-09-24",
    "endDate": "2026-09-26",
    "duration": 3,
    "status": "Approved",
    "approver": "Vikram Malhotra",
    "allocationUsed": "Comp Off (2026 Annual Balance)",
    "reason": "Attending family wedding ceremony"
  },
  {
    "id": "req-16",
    "customId": "req-16",
    "employeeId": "emp-16",
    "employeeName": "Tanvi Kulkarni",
    "type": "Casual Leave",
    "startDate": "2026-09-25",
    "endDate": "2026-09-25",
    "duration": 1,
    "status": "Refused",
    "approver": "Rahul Dravid",
    "allocationUsed": "Casual Leave (2026 Annual Balance)",
    "reason": "Child school admission and parent meeting"
  },
  {
    "id": "req-17",
    "customId": "req-17",
    "employeeId": "emp-17",
    "employeeName": "Siddharth Varma",
    "type": "Paid Time Off",
    "startDate": "2026-09-26",
    "endDate": "2026-09-27",
    "duration": 2,
    "status": "Approved",
    "approver": "Aditya Kapoor",
    "allocationUsed": "Paid Time Off (2026 Annual Balance)",
    "reason": "Dental surgery and medical appointment"
  },
  {
    "id": "req-18",
    "customId": "req-18",
    "employeeId": "emp-18",
    "employeeName": "Pooja Hegde",
    "type": "Sick Leave",
    "startDate": "2026-09-27",
    "endDate": "2026-09-29",
    "duration": 3,
    "status": "Approved",
    "approver": "Neha Patel",
    "allocationUsed": "Sick Leave (2026 Annual Balance)",
    "reason": "Emergency home maintenance"
  },
  {
    "id": "req-19",
    "customId": "req-19",
    "employeeId": "emp-19",
    "employeeName": "Manav Reddy",
    "type": "Comp Off",
    "startDate": "2026-09-10",
    "endDate": "2026-09-10",
    "duration": 1,
    "status": "To Approve",
    "approver": "Rajesh Nair",
    "allocationUsed": "Comp Off (2026 Annual Balance)",
    "reason": "Severe fever and doctor advised rest"
  },
  {
    "id": "req-20",
    "customId": "req-20",
    "employeeId": "emp-20",
    "employeeName": "Riya Sengupta",
    "type": "Casual Leave",
    "startDate": "2026-09-11",
    "endDate": "2026-09-12",
    "duration": 2,
    "status": "Approved",
    "approver": "Sara Khan",
    "allocationUsed": "Casual Leave (2026 Annual Balance)",
    "reason": "Festive celebration with extended family"
  },
  {
    "id": "req-21",
    "customId": "req-21",
    "employeeId": "emp-21",
    "employeeName": "Kunal Roy",
    "type": "Paid Time Off",
    "startDate": "2026-09-12",
    "endDate": "2026-09-14",
    "duration": 3,
    "status": "Approved",
    "approver": "Vikram Malhotra",
    "allocationUsed": "Paid Time Off (2026 Annual Balance)",
    "reason": "Family vacation and travel"
  },
  {
    "id": "req-22",
    "customId": "req-22",
    "employeeId": "emp-22",
    "employeeName": "Diya Bansal",
    "type": "Sick Leave",
    "startDate": "2026-09-13",
    "endDate": "2026-09-13",
    "duration": 1,
    "status": "Approved",
    "approver": "Ananya Iyer",
    "allocationUsed": "Sick Leave (2026 Annual Balance)",
    "reason": "Personal medical consultation and rest"
  },
  {
    "id": "req-23",
    "customId": "req-23",
    "employeeId": "emp-23",
    "employeeName": "Arjun Singhania",
    "type": "Comp Off",
    "startDate": "2026-09-14",
    "endDate": "2026-09-15",
    "duration": 2,
    "status": "Approved",
    "approver": "Priya Sharma",
    "allocationUsed": "Comp Off (2026 Annual Balance)",
    "reason": "Weekend release overtime comp-off"
  },
  {
    "id": "req-24",
    "customId": "req-24",
    "employeeId": "emp-24",
    "employeeName": "Shreya Ghoshal",
    "type": "Casual Leave",
    "startDate": "2026-09-15",
    "endDate": "2026-09-17",
    "duration": 3,
    "status": "Approved",
    "approver": "Sneha Joshi",
    "allocationUsed": "Casual Leave (2026 Annual Balance)",
    "reason": "Home relocation and settlement"
  },
  {
    "id": "req-25",
    "customId": "req-25",
    "employeeId": "emp-25",
    "employeeName": "Varun Grover",
    "type": "Paid Time Off",
    "startDate": "2026-09-16",
    "endDate": "2026-09-16",
    "duration": 1,
    "status": "To Approve",
    "approver": "Aditya Kapoor",
    "allocationUsed": "Paid Time Off (2026 Annual Balance)",
    "reason": "Attending family wedding ceremony"
  },
  {
    "id": "req-26",
    "customId": "req-26",
    "employeeId": "emp-26",
    "employeeName": "Kriti Sanon",
    "type": "Sick Leave",
    "startDate": "2026-09-17",
    "endDate": "2026-09-18",
    "duration": 2,
    "status": "Approved",
    "approver": "Sara Khan",
    "allocationUsed": "Sick Leave (2026 Annual Balance)",
    "reason": "Child school admission and parent meeting"
  },
  {
    "id": "req-27",
    "customId": "req-27",
    "employeeId": "emp-27",
    "employeeName": "Nikhil Chinapa",
    "type": "Comp Off",
    "startDate": "2026-09-18",
    "endDate": "2026-09-20",
    "duration": 3,
    "status": "Approved",
    "approver": "Kabir Deshmukh",
    "allocationUsed": "Comp Off (2026 Annual Balance)",
    "reason": "Dental surgery and medical appointment"
  },
  {
    "id": "req-28",
    "customId": "req-28",
    "employeeId": "emp-28",
    "employeeName": "Alia Bhattacharya",
    "type": "Casual Leave",
    "startDate": "2026-09-19",
    "endDate": "2026-09-19",
    "duration": 1,
    "status": "Approved",
    "approver": "Vikram Malhotra",
    "allocationUsed": "Casual Leave (2026 Annual Balance)",
    "reason": "Emergency home maintenance"
  },
  {
    "id": "req-29",
    "customId": "req-29",
    "employeeId": "emp-29",
    "employeeName": "Gautam Gambhir",
    "type": "Paid Time Off",
    "startDate": "2026-09-20",
    "endDate": "2026-09-21",
    "duration": 2,
    "status": "Approved",
    "approver": "Devendra Rao",
    "allocationUsed": "Paid Time Off (2026 Annual Balance)",
    "reason": "Severe fever and doctor advised rest"
  },
  {
    "id": "req-30",
    "customId": "req-30",
    "employeeId": "emp-30",
    "employeeName": "Simran Walia",
    "type": "Sick Leave",
    "startDate": "2026-09-21",
    "endDate": "2026-09-23",
    "duration": 3,
    "status": "Approved",
    "approver": "Tanvi Kulkarni",
    "allocationUsed": "Sick Leave (2026 Annual Balance)",
    "reason": "Festive celebration with extended family"
  },
  {
    "id": "req-31",
    "customId": "req-31",
    "employeeId": "emp-31",
    "employeeName": "Tarun Khanna",
    "type": "Comp Off",
    "startDate": "2026-09-22",
    "endDate": "2026-09-22",
    "duration": 1,
    "status": "To Approve",
    "approver": "Aarav Mehta",
    "allocationUsed": "Comp Off (2026 Annual Balance)",
    "reason": "Family vacation and travel"
  },
  {
    "id": "req-32",
    "customId": "req-32",
    "employeeId": "emp-32",
    "employeeName": "Natasha Poonawalla",
    "type": "Casual Leave",
    "startDate": "2026-09-23",
    "endDate": "2026-09-24",
    "duration": 2,
    "status": "Approved",
    "approver": "Manav Reddy",
    "allocationUsed": "Casual Leave (2026 Annual Balance)",
    "reason": "Personal medical consultation and rest"
  },
  {
    "id": "req-33",
    "customId": "req-33",
    "employeeId": "emp-33",
    "employeeName": "Pranav Anand",
    "type": "Paid Time Off",
    "startDate": "2026-09-24",
    "endDate": "2026-09-26",
    "duration": 3,
    "status": "Approved",
    "approver": "Aditya Kapoor",
    "allocationUsed": "Paid Time Off (2026 Annual Balance)",
    "reason": "Weekend release overtime comp-off"
  },
  {
    "id": "req-34",
    "customId": "req-34",
    "employeeId": "emp-34",
    "employeeName": "Swati Piramal",
    "type": "Sick Leave",
    "startDate": "2026-09-25",
    "endDate": "2026-09-25",
    "duration": 1,
    "status": "Approved",
    "approver": "Sneha Joshi",
    "allocationUsed": "Sick Leave (2026 Annual Balance)",
    "reason": "Home relocation and settlement"
  },
  {
    "id": "req-35",
    "customId": "req-35",
    "employeeId": "emp-35",
    "employeeName": "Harsh Vardhan",
    "type": "Comp Off",
    "startDate": "2026-09-26",
    "endDate": "2026-09-27",
    "duration": 2,
    "status": "Approved",
    "approver": "Vikram Malhotra",
    "allocationUsed": "Comp Off (2026 Annual Balance)",
    "reason": "Attending family wedding ceremony"
  },
  {
    "id": "req-36",
    "customId": "req-36",
    "employeeId": "emp-36",
    "employeeName": "Lavanya Sundaram",
    "type": "Casual Leave",
    "startDate": "2026-09-27",
    "endDate": "2026-09-29",
    "duration": 3,
    "status": "Approved",
    "approver": "Ananya Iyer",
    "allocationUsed": "Casual Leave (2026 Annual Balance)",
    "reason": "Child school admission and parent meeting"
  },
  {
    "id": "req-37",
    "customId": "req-37",
    "employeeId": "emp-37",
    "employeeName": "Rishi Kapoor",
    "type": "Paid Time Off",
    "startDate": "2026-09-10",
    "endDate": "2026-09-10",
    "duration": 1,
    "status": "To Approve",
    "approver": "Priya Sharma",
    "allocationUsed": "Paid Time Off (2026 Annual Balance)",
    "reason": "Dental surgery and medical appointment"
  },
  {
    "id": "req-38",
    "customId": "req-38",
    "employeeId": "emp-38",
    "employeeName": "Avani Chaturvedi",
    "type": "Sick Leave",
    "startDate": "2026-09-11",
    "endDate": "2026-09-12",
    "duration": 2,
    "status": "Approved",
    "approver": "Ishaan Bhat",
    "allocationUsed": "Sick Leave (2026 Annual Balance)",
    "reason": "Emergency home maintenance"
  },
  {
    "id": "req-39",
    "customId": "req-39",
    "employeeId": "emp-39",
    "employeeName": "Mohit Chauhan",
    "type": "Comp Off",
    "startDate": "2026-09-12",
    "endDate": "2026-09-14",
    "duration": 3,
    "status": "Approved",
    "approver": "Rajesh Nair",
    "allocationUsed": "Comp Off (2026 Annual Balance)",
    "reason": "Severe fever and doctor advised rest"
  },
  {
    "id": "req-40",
    "customId": "req-40",
    "employeeId": "emp-40",
    "employeeName": "Sunita Narain",
    "type": "Casual Leave",
    "startDate": "2026-09-13",
    "endDate": "2026-09-13",
    "duration": 1,
    "status": "Approved",
    "approver": "Devendra Rao",
    "allocationUsed": "Casual Leave (2026 Annual Balance)",
    "reason": "Festive celebration with extended family"
  },
  {
    "id": "req-41",
    "customId": "req-41",
    "employeeId": "emp-41",
    "employeeName": "Rahul Dravid",
    "type": "Paid Time Off",
    "startDate": "2026-09-14",
    "endDate": "2026-09-15",
    "duration": 2,
    "status": "Approved",
    "approver": "Sara Khan",
    "allocationUsed": "Paid Time Off (2026 Annual Balance)",
    "reason": "Family vacation and travel"
  },
  {
    "id": "req-42",
    "customId": "req-42",
    "employeeId": "emp-42",
    "employeeName": "Fatima Sana",
    "type": "Sick Leave",
    "startDate": "2026-09-15",
    "endDate": "2026-09-17",
    "duration": 3,
    "status": "Approved",
    "approver": "Kabir Deshmukh",
    "allocationUsed": "Sick Leave (2026 Annual Balance)",
    "reason": "Personal medical consultation and rest"
  },
  {
    "id": "req-43",
    "customId": "req-43",
    "employeeId": "emp-43",
    "employeeName": "Chetan Bhagat",
    "type": "Comp Off",
    "startDate": "2026-09-16",
    "endDate": "2026-09-16",
    "duration": 1,
    "status": "To Approve",
    "approver": "Sneha Joshi",
    "allocationUsed": "Comp Off (2026 Annual Balance)",
    "reason": "Weekend release overtime comp-off"
  },
  {
    "id": "req-44",
    "customId": "req-44",
    "employeeId": "emp-44",
    "employeeName": "Deepinder Goyal",
    "type": "Casual Leave",
    "startDate": "2026-09-17",
    "endDate": "2026-09-18",
    "duration": 2,
    "status": "Approved",
    "approver": "Rahul Dravid",
    "allocationUsed": "Casual Leave (2026 Annual Balance)",
    "reason": "Home relocation and settlement"
  },
  {
    "id": "req-45",
    "customId": "req-45",
    "employeeId": "emp-45",
    "employeeName": "Falguni Nayar",
    "type": "Paid Time Off",
    "startDate": "2026-09-18",
    "endDate": "2026-09-20",
    "duration": 3,
    "status": "Approved",
    "approver": "Sara Khan",
    "allocationUsed": "Paid Time Off (2026 Annual Balance)",
    "reason": "Attending family wedding ceremony"
  },
  {
    "id": "req-46",
    "customId": "req-46",
    "employeeId": "emp-46",
    "employeeName": "Jaspreet Bumrah",
    "type": "Sick Leave",
    "startDate": "2026-09-19",
    "endDate": "2026-09-19",
    "duration": 1,
    "status": "Refused",
    "approver": "Tanvi Kulkarni",
    "allocationUsed": "Sick Leave (2026 Annual Balance)",
    "reason": "Child school admission and parent meeting"
  },
  {
    "id": "req-47",
    "customId": "req-47",
    "employeeId": "emp-47",
    "employeeName": "Vidya Balan",
    "type": "Comp Off",
    "startDate": "2026-09-20",
    "endDate": "2026-09-21",
    "duration": 2,
    "status": "Approved",
    "approver": "Sara Khan",
    "allocationUsed": "Comp Off (2026 Annual Balance)",
    "reason": "Dental surgery and medical appointment"
  },
  {
    "id": "req-48",
    "customId": "req-48",
    "employeeId": "emp-48",
    "employeeName": "Sachin Tendulkar",
    "type": "Casual Leave",
    "startDate": "2026-09-21",
    "endDate": "2026-09-23",
    "duration": 3,
    "status": "Approved",
    "approver": "Rajesh Nair",
    "allocationUsed": "Casual Leave (2026 Annual Balance)",
    "reason": "Emergency home maintenance"
  },
  {
    "id": "req-49",
    "customId": "req-49",
    "employeeId": "emp-49",
    "employeeName": "Mithali Raj",
    "type": "Paid Time Off",
    "startDate": "2026-09-22",
    "endDate": "2026-09-22",
    "duration": 1,
    "status": "To Approve",
    "approver": "Devendra Rao",
    "allocationUsed": "Paid Time Off (2026 Annual Balance)",
    "reason": "Severe fever and doctor advised rest"
  },
  {
    "id": "req-50",
    "customId": "req-50",
    "employeeId": "emp-50",
    "employeeName": "Boman Irani",
    "type": "Sick Leave",
    "startDate": "2026-09-23",
    "endDate": "2026-09-24",
    "duration": 2,
    "status": "Approved",
    "approver": "Devendra Rao",
    "allocationUsed": "Sick Leave (2026 Annual Balance)",
    "reason": "Festive celebration with extended family"
  }
];

export const SEED_SALARY_STRUCTURES = [
  {
    "id": "str-1",
    "name": "Regular Salary",
    "rulesCount": 7,
    "employeesCount": 22,
    "active": true,
    "rules": [
      {
        "sequence": 1,
        "name": "Basic Salary",
        "code": "BASIC",
        "category": "Basic",
        "computation": "Percentage of Wage",
        "percentage": 50,
        "fixedAmount": 0,
        "formula": "WAGE * 0.50"
      },
      {
        "sequence": 10,
        "name": "House Rent Allowance",
        "code": "HRA",
        "category": "Allowance",
        "computation": "Percentage of Basic",
        "percentage": 40,
        "fixedAmount": 0,
        "formula": "BASIC * 0.40"
      },
      {
        "sequence": 20,
        "name": "Standard Allowance",
        "code": "STD",
        "category": "Allowance",
        "computation": "Fixed Amount",
        "percentage": 0,
        "fixedAmount": 10000,
        "formula": "10000"
      },
      {
        "sequence": 60,
        "name": "Gross Salary",
        "code": "GROSS",
        "category": "Gross",
        "computation": "Formula",
        "percentage": 0,
        "fixedAmount": 0,
        "formula": "BASIC + HRA + STD"
      },
      {
        "sequence": 80,
        "name": "Provident Fund",
        "code": "PF",
        "category": "Deduction",
        "computation": "Percentage of Basic",
        "percentage": 12,
        "fixedAmount": 0,
        "formula": "BASIC * 0.12"
      },
      {
        "sequence": 100,
        "name": "Professional Tax",
        "code": "PT",
        "category": "Deduction",
        "computation": "Fixed Amount",
        "percentage": 0,
        "fixedAmount": 3000,
        "formula": "3000"
      },
      {
        "sequence": 110,
        "name": "Net Salary",
        "code": "NET",
        "category": "Net",
        "computation": "Formula",
        "percentage": 0,
        "fixedAmount": 0,
        "formula": "GROSS - PF - PT"
      }
    ]
  },
  {
    "id": "str-2",
    "name": "Tech Specialist",
    "rulesCount": 8,
    "employeesCount": 12,
    "active": true,
    "rules": [
      {
        "sequence": 1,
        "name": "Basic Salary",
        "code": "BASIC",
        "category": "Basic",
        "computation": "Percentage of Wage",
        "percentage": 55,
        "fixedAmount": 0,
        "formula": "WAGE * 0.55"
      },
      {
        "sequence": 10,
        "name": "House Rent Allowance",
        "code": "HRA",
        "category": "Allowance",
        "computation": "Percentage of Basic",
        "percentage": 40,
        "fixedAmount": 0,
        "formula": "BASIC * 0.40"
      },
      {
        "sequence": 20,
        "name": "Tech & R&D Allowance",
        "code": "TECH",
        "category": "Allowance",
        "computation": "Fixed Amount",
        "percentage": 0,
        "fixedAmount": 15000,
        "formula": "15000"
      },
      {
        "sequence": 30,
        "name": "Special Allowance",
        "code": "SPL",
        "category": "Allowance",
        "computation": "Fixed Amount",
        "percentage": 0,
        "fixedAmount": 8000,
        "formula": "8000"
      },
      {
        "sequence": 60,
        "name": "Gross Salary",
        "code": "GROSS",
        "category": "Gross",
        "computation": "Formula",
        "percentage": 0,
        "fixedAmount": 0,
        "formula": "BASIC + HRA + TECH + SPL"
      },
      {
        "sequence": 80,
        "name": "Provident Fund",
        "code": "PF",
        "category": "Deduction",
        "computation": "Percentage of Basic",
        "percentage": 12,
        "fixedAmount": 0,
        "formula": "BASIC * 0.12"
      },
      {
        "sequence": 100,
        "name": "Professional Tax",
        "code": "PT",
        "category": "Deduction",
        "computation": "Fixed Amount",
        "percentage": 0,
        "fixedAmount": 3000,
        "formula": "3000"
      },
      {
        "sequence": 110,
        "name": "Net Salary",
        "code": "NET",
        "category": "Net",
        "computation": "Formula",
        "percentage": 0,
        "fixedAmount": 0,
        "formula": "GROSS - PF - PT"
      }
    ]
  },
  {
    "id": "str-3",
    "name": "Executive Leadership",
    "rulesCount": 8,
    "employeesCount": 5,
    "active": true,
    "rules": [
      {
        "sequence": 1,
        "name": "Basic Salary",
        "code": "BASIC",
        "category": "Basic",
        "computation": "Percentage of Wage",
        "percentage": 50,
        "fixedAmount": 0,
        "formula": "WAGE * 0.50"
      },
      {
        "sequence": 10,
        "name": "House Rent Allowance",
        "code": "HRA",
        "category": "Allowance",
        "computation": "Percentage of Basic",
        "percentage": 50,
        "fixedAmount": 0,
        "formula": "BASIC * 0.50"
      },
      {
        "sequence": 20,
        "name": "Executive Perk",
        "code": "EXEC",
        "category": "Allowance",
        "computation": "Fixed Amount",
        "percentage": 0,
        "fixedAmount": 30000,
        "formula": "30000"
      },
      {
        "sequence": 30,
        "name": "Car & Travel Allowance",
        "code": "CAR",
        "category": "Allowance",
        "computation": "Fixed Amount",
        "percentage": 0,
        "fixedAmount": 15000,
        "formula": "15000"
      },
      {
        "sequence": 60,
        "name": "Gross Salary",
        "code": "GROSS",
        "category": "Gross",
        "computation": "Formula",
        "percentage": 0,
        "fixedAmount": 0,
        "formula": "BASIC + HRA + EXEC + CAR"
      },
      {
        "sequence": 80,
        "name": "Provident Fund",
        "code": "PF",
        "category": "Deduction",
        "computation": "Percentage of Basic",
        "percentage": 12,
        "fixedAmount": 0,
        "formula": "BASIC * 0.12"
      },
      {
        "sequence": 100,
        "name": "Professional Tax",
        "code": "PT",
        "category": "Deduction",
        "computation": "Fixed Amount",
        "percentage": 0,
        "fixedAmount": 3000,
        "formula": "3000"
      },
      {
        "sequence": 110,
        "name": "Net Salary",
        "code": "NET",
        "category": "Net",
        "computation": "Formula",
        "percentage": 0,
        "fixedAmount": 0,
        "formula": "GROSS - PF - PT"
      }
    ]
  },
  {
    "id": "str-4",
    "name": "Contractor Fixed",
    "rulesCount": 3,
    "employeesCount": 4,
    "active": true,
    "rules": [
      {
        "sequence": 1,
        "name": "Fixed Retainer",
        "code": "RETAINER",
        "category": "Basic",
        "computation": "Percentage of Wage",
        "percentage": 100,
        "fixedAmount": 0,
        "formula": "WAGE * 1.00"
      },
      {
        "sequence": 10,
        "name": "TDS Deduction (10%)",
        "code": "TDS",
        "category": "Deduction",
        "computation": "Percentage of Wage",
        "percentage": 10,
        "fixedAmount": 0,
        "formula": "RETAINER * 0.10"
      },
      {
        "sequence": 20,
        "name": "Net Payout",
        "code": "NET",
        "category": "Net",
        "computation": "Formula",
        "percentage": 0,
        "fixedAmount": 0,
        "formula": "RETAINER - TDS"
      }
    ]
  },
  {
    "id": "str-5",
    "name": "Intern Salary",
    "rulesCount": 4,
    "employeesCount": 3,
    "active": true,
    "rules": [
      {
        "sequence": 1,
        "name": "Stipend Base",
        "code": "STIPEND",
        "category": "Basic",
        "computation": "Percentage of Wage",
        "percentage": 80,
        "fixedAmount": 0,
        "formula": "WAGE * 0.80"
      },
      {
        "sequence": 10,
        "name": "Travel Conveyance",
        "code": "CONV",
        "category": "Allowance",
        "computation": "Fixed Amount",
        "percentage": 0,
        "fixedAmount": 5000,
        "formula": "5000"
      },
      {
        "sequence": 20,
        "name": "Gross Stipend",
        "code": "GROSS",
        "category": "Gross",
        "computation": "Formula",
        "percentage": 0,
        "fixedAmount": 0,
        "formula": "STIPEND + CONV"
      },
      {
        "sequence": 30,
        "name": "Net Stipend",
        "code": "NET",
        "category": "Net",
        "computation": "Formula",
        "percentage": 0,
        "fixedAmount": 0,
        "formula": "GROSS"
      }
    ]
  },
  {
    "id": "str-6",
    "name": "Sales Commission",
    "rulesCount": 7,
    "employeesCount": 4,
    "active": true,
    "rules": [
      {
        "sequence": 1,
        "name": "Basic Salary",
        "code": "BASIC",
        "category": "Basic",
        "computation": "Percentage of Wage",
        "percentage": 45,
        "fixedAmount": 0,
        "formula": "WAGE * 0.45"
      },
      {
        "sequence": 10,
        "name": "House Rent Allowance",
        "code": "HRA",
        "category": "Allowance",
        "computation": "Percentage of Basic",
        "percentage": 40,
        "fixedAmount": 0,
        "formula": "BASIC * 0.40"
      },
      {
        "sequence": 20,
        "name": "Sales Target Bonus",
        "code": "BONUS",
        "category": "Allowance",
        "computation": "Fixed Amount",
        "percentage": 0,
        "fixedAmount": 14000,
        "formula": "14000"
      },
      {
        "sequence": 60,
        "name": "Gross Salary",
        "code": "GROSS",
        "category": "Gross",
        "computation": "Formula",
        "percentage": 0,
        "fixedAmount": 0,
        "formula": "BASIC + HRA + BONUS"
      },
      {
        "sequence": 80,
        "name": "Provident Fund",
        "code": "PF",
        "category": "Deduction",
        "computation": "Percentage of Basic",
        "percentage": 12,
        "fixedAmount": 0,
        "formula": "BASIC * 0.12"
      },
      {
        "sequence": 100,
        "name": "Professional Tax",
        "code": "PT",
        "category": "Deduction",
        "computation": "Fixed Amount",
        "percentage": 0,
        "fixedAmount": 3000,
        "formula": "3000"
      },
      {
        "sequence": 110,
        "name": "Net Salary",
        "code": "NET",
        "category": "Net",
        "computation": "Formula",
        "percentage": 0,
        "fixedAmount": 0,
        "formula": "GROSS - PF - PT"
      }
    ]
  }
];

export const SEED_ATTENDANCE = [
  {
    "id": "att-1",
    "customId": "att-1",
    "employeeId": "emp-1",
    "employeeName": "Aarav Mehta",
    "date": "01-Sep-2026",
    "checkIn": "—",
    "checkOut": "—",
    "workedHours": "0.00",
    "status": "Absent",
    "department": "Finance & Payroll",
    "manager": "Sara Khan",
    "overtime": "0.00 hrs",
    "notes": "Unplanned absence / no punch recorded.",
    "isManuallyEdited": true
  },
  {
    "id": "att-2",
    "customId": "att-2",
    "employeeId": "emp-2",
    "employeeName": "Sara Khan",
    "date": "02-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:10",
    "workedHours": "9.08",
    "status": "Present",
    "department": "Human Resources",
    "manager": "Falguni Nayar",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-3",
    "customId": "att-3",
    "employeeId": "emp-3",
    "employeeName": "John Dsouza",
    "date": "03-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:10",
    "workedHours": "9.08",
    "status": "Present",
    "department": "Engineering",
    "manager": "Rahul Dravid",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-4",
    "customId": "att-4",
    "employeeId": "emp-4",
    "employeeName": "Neha Patel",
    "date": "04-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:40",
    "workedHours": "9.58",
    "status": "Present",
    "department": "Human Resources",
    "manager": "Sara Khan",
    "overtime": "0.50 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-5",
    "customId": "att-5",
    "employeeId": "emp-5",
    "employeeName": "Rohan Patel",
    "date": "05-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:10",
    "workedHours": "9.08",
    "status": "Present",
    "department": "Engineering",
    "manager": "Rahul Dravid",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-6",
    "customId": "att-6",
    "employeeId": "emp-6",
    "employeeName": "Vikram Malhotra",
    "date": "01-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:10",
    "workedHours": "9.08",
    "status": "Present",
    "department": "Engineering",
    "manager": "Rahul Dravid",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-7",
    "customId": "att-7",
    "employeeId": "emp-7",
    "employeeName": "Priya Sharma",
    "date": "02-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:40",
    "workedHours": "9.58",
    "status": "Present",
    "department": "Product Management",
    "manager": "Aarav Mehta",
    "overtime": "0.50 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-8",
    "customId": "att-8",
    "employeeId": "emp-8",
    "employeeName": "Aditya Kapoor",
    "date": "03-Sep-2026",
    "checkIn": "10:15",
    "checkOut": "18:15",
    "workedHours": "8.00",
    "status": "Late",
    "department": "Engineering",
    "manager": "Vikram Malhotra",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": true
  },
  {
    "id": "att-9",
    "customId": "att-9",
    "employeeId": "emp-9",
    "employeeName": "Ananya Iyer",
    "date": "04-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:10",
    "workedHours": "9.08",
    "status": "Present",
    "department": "Finance & Payroll",
    "manager": "Aarav Mehta",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-10",
    "customId": "att-10",
    "employeeId": "emp-10",
    "employeeName": "Rajesh Nair",
    "date": "05-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:40",
    "workedHours": "9.58",
    "status": "Present",
    "department": "Sales & Business Dev",
    "manager": "Falguni Nayar",
    "overtime": "0.50 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-11",
    "customId": "att-11",
    "employeeId": "emp-11",
    "employeeName": "Sneha Joshi",
    "date": "01-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:10",
    "workedHours": "9.08",
    "status": "Present",
    "department": "Marketing & Growth",
    "manager": "Rajesh Nair",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-12",
    "customId": "att-12",
    "employeeId": "emp-12",
    "employeeName": "Kabir Deshmukh",
    "date": "02-Sep-2026",
    "checkIn": "09:00",
    "checkOut": "13:30",
    "workedHours": "4.50",
    "status": "Half Day",
    "department": "Customer Success",
    "manager": "Sara Khan",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": true
  },
  {
    "id": "att-13",
    "customId": "att-13",
    "employeeId": "emp-13",
    "employeeName": "Meera Sen",
    "date": "03-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:40",
    "workedHours": "9.58",
    "status": "Present",
    "department": "Engineering",
    "manager": "Aditya Kapoor",
    "overtime": "0.50 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-14",
    "customId": "att-14",
    "employeeId": "emp-14",
    "employeeName": "Devendra Rao",
    "date": "04-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:10",
    "workedHours": "9.08",
    "status": "Present",
    "department": "Operations & Admin",
    "manager": "Falguni Nayar",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-15",
    "customId": "att-15",
    "employeeId": "emp-15",
    "employeeName": "Ishaan Bhat",
    "date": "05-Sep-2026",
    "checkIn": "10:15",
    "checkOut": "18:15",
    "workedHours": "8.00",
    "status": "Late",
    "department": "Engineering",
    "manager": "Vikram Malhotra",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": true
  },
  {
    "id": "att-16",
    "customId": "att-16",
    "employeeId": "emp-16",
    "employeeName": "Tanvi Kulkarni",
    "date": "01-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:40",
    "workedHours": "9.58",
    "status": "Present",
    "department": "Quality Assurance",
    "manager": "Rahul Dravid",
    "overtime": "0.50 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-17",
    "customId": "att-17",
    "employeeId": "emp-17",
    "employeeName": "Siddharth Varma",
    "date": "02-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:10",
    "workedHours": "9.08",
    "status": "Present",
    "department": "Engineering",
    "manager": "Aditya Kapoor",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-18",
    "customId": "att-18",
    "employeeId": "emp-18",
    "employeeName": "Pooja Hegde",
    "date": "03-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:10",
    "workedHours": "9.08",
    "status": "Present",
    "department": "Human Resources",
    "manager": "Neha Patel",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-19",
    "customId": "att-19",
    "employeeId": "emp-19",
    "employeeName": "Manav Reddy",
    "date": "04-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:40",
    "workedHours": "9.58",
    "status": "Present",
    "department": "Sales & Business Dev",
    "manager": "Rajesh Nair",
    "overtime": "0.50 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-20",
    "customId": "att-20",
    "employeeId": "emp-20",
    "employeeName": "Riya Sengupta",
    "date": "05-Sep-2026",
    "checkIn": "—",
    "checkOut": "—",
    "workedHours": "0.00",
    "status": "Absent",
    "department": "Legal & Compliance",
    "manager": "Sara Khan",
    "overtime": "0.00 hrs",
    "notes": "Unplanned absence / no punch recorded.",
    "isManuallyEdited": false
  },
  {
    "id": "att-21",
    "customId": "att-21",
    "employeeId": "emp-21",
    "employeeName": "Kunal Roy",
    "date": "01-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:10",
    "workedHours": "9.08",
    "status": "Present",
    "department": "Engineering",
    "manager": "Vikram Malhotra",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-22",
    "customId": "att-22",
    "employeeId": "emp-22",
    "employeeName": "Diya Bansal",
    "date": "02-Sep-2026",
    "checkIn": "10:15",
    "checkOut": "18:15",
    "workedHours": "8.00",
    "status": "Late",
    "department": "Finance & Payroll",
    "manager": "Ananya Iyer",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": true
  },
  {
    "id": "att-23",
    "customId": "att-23",
    "employeeId": "emp-23",
    "employeeName": "Arjun Singhania",
    "date": "03-Sep-2026",
    "checkIn": "09:00",
    "checkOut": "13:30",
    "workedHours": "4.50",
    "status": "Half Day",
    "department": "Product Management",
    "manager": "Priya Sharma",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": true
  },
  {
    "id": "att-24",
    "customId": "att-24",
    "employeeId": "emp-24",
    "employeeName": "Shreya Ghoshal",
    "date": "04-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:10",
    "workedHours": "9.08",
    "status": "Present",
    "department": "Marketing & Growth",
    "manager": "Sneha Joshi",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-25",
    "customId": "att-25",
    "employeeId": "emp-25",
    "employeeName": "Varun Grover",
    "date": "05-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:40",
    "workedHours": "9.58",
    "status": "Present",
    "department": "Engineering",
    "manager": "Aditya Kapoor",
    "overtime": "0.50 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-26",
    "customId": "att-26",
    "employeeId": "emp-26",
    "employeeName": "Kriti Sanon",
    "date": "01-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:10",
    "workedHours": "9.08",
    "status": "Present",
    "department": "Human Resources",
    "manager": "Sara Khan",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-27",
    "customId": "att-27",
    "employeeId": "emp-27",
    "employeeName": "Nikhil Chinapa",
    "date": "02-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:10",
    "workedHours": "9.08",
    "status": "Present",
    "department": "Customer Success",
    "manager": "Kabir Deshmukh",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-28",
    "customId": "att-28",
    "employeeId": "emp-28",
    "employeeName": "Alia Bhattacharya",
    "date": "03-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:40",
    "workedHours": "9.58",
    "status": "Present",
    "department": "Engineering",
    "manager": "Vikram Malhotra",
    "overtime": "0.50 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-29",
    "customId": "att-29",
    "employeeId": "emp-29",
    "employeeName": "Gautam Gambhir",
    "date": "04-Sep-2026",
    "checkIn": "10:15",
    "checkOut": "18:15",
    "workedHours": "8.00",
    "status": "Late",
    "department": "Operations & Admin",
    "manager": "Devendra Rao",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": true
  },
  {
    "id": "att-30",
    "customId": "att-30",
    "employeeId": "emp-30",
    "employeeName": "Simran Walia",
    "date": "05-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:10",
    "workedHours": "9.08",
    "status": "Present",
    "department": "Quality Assurance",
    "manager": "Tanvi Kulkarni",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-31",
    "customId": "att-31",
    "employeeId": "emp-31",
    "employeeName": "Tarun Khanna",
    "date": "01-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:40",
    "workedHours": "9.58",
    "status": "Present",
    "department": "Finance & Payroll",
    "manager": "Aarav Mehta",
    "overtime": "0.50 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-32",
    "customId": "att-32",
    "employeeId": "emp-32",
    "employeeName": "Natasha Poonawalla",
    "date": "02-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:10",
    "workedHours": "9.08",
    "status": "Present",
    "department": "Sales & Business Dev",
    "manager": "Manav Reddy",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-33",
    "customId": "att-33",
    "employeeId": "emp-33",
    "employeeName": "Pranav Anand",
    "date": "03-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:10",
    "workedHours": "9.08",
    "status": "Present",
    "department": "Engineering",
    "manager": "Aditya Kapoor",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-34",
    "customId": "att-34",
    "employeeId": "emp-34",
    "employeeName": "Swati Piramal",
    "date": "04-Sep-2026",
    "checkIn": "09:00",
    "checkOut": "13:30",
    "workedHours": "4.50",
    "status": "Half Day",
    "department": "Marketing & Growth",
    "manager": "Sneha Joshi",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": true
  },
  {
    "id": "att-35",
    "customId": "att-35",
    "employeeId": "emp-35",
    "employeeName": "Harsh Vardhan",
    "date": "05-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:10",
    "workedHours": "9.08",
    "status": "Present",
    "department": "Engineering",
    "manager": "Vikram Malhotra",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-36",
    "customId": "att-36",
    "employeeId": "emp-36",
    "employeeName": "Lavanya Sundaram",
    "date": "01-Sep-2026",
    "checkIn": "10:15",
    "checkOut": "18:15",
    "workedHours": "8.00",
    "status": "Late",
    "department": "Finance & Payroll",
    "manager": "Ananya Iyer",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": true
  },
  {
    "id": "att-37",
    "customId": "att-37",
    "employeeId": "emp-37",
    "employeeName": "Rishi Kapoor",
    "date": "02-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:40",
    "workedHours": "9.58",
    "status": "Present",
    "department": "Product Management",
    "manager": "Priya Sharma",
    "overtime": "0.50 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-38",
    "customId": "att-38",
    "employeeId": "emp-38",
    "employeeName": "Avani Chaturvedi",
    "date": "03-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:10",
    "workedHours": "9.08",
    "status": "Present",
    "department": "Engineering",
    "manager": "Ishaan Bhat",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-39",
    "customId": "att-39",
    "employeeId": "emp-39",
    "employeeName": "Mohit Chauhan",
    "date": "04-Sep-2026",
    "checkIn": "—",
    "checkOut": "—",
    "workedHours": "0.00",
    "status": "Absent",
    "department": "Sales & Business Dev",
    "manager": "Rajesh Nair",
    "overtime": "0.00 hrs",
    "notes": "Unplanned absence / no punch recorded.",
    "isManuallyEdited": false
  },
  {
    "id": "att-40",
    "customId": "att-40",
    "employeeId": "emp-40",
    "employeeName": "Sunita Narain",
    "date": "05-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:40",
    "workedHours": "9.58",
    "status": "Present",
    "department": "Operations & Admin",
    "manager": "Devendra Rao",
    "overtime": "0.50 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-41",
    "customId": "att-41",
    "employeeId": "emp-41",
    "employeeName": "Rahul Dravid",
    "date": "01-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:10",
    "workedHours": "9.08",
    "status": "Present",
    "department": "Engineering",
    "manager": "Sara Khan",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-42",
    "customId": "att-42",
    "employeeId": "emp-42",
    "employeeName": "Fatima Sana",
    "date": "02-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:10",
    "workedHours": "9.08",
    "status": "Present",
    "department": "Customer Success",
    "manager": "Kabir Deshmukh",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-43",
    "customId": "att-43",
    "employeeId": "emp-43",
    "employeeName": "Chetan Bhagat",
    "date": "03-Sep-2026",
    "checkIn": "10:15",
    "checkOut": "18:15",
    "workedHours": "8.00",
    "status": "Late",
    "department": "Marketing & Growth",
    "manager": "Sneha Joshi",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": true
  },
  {
    "id": "att-44",
    "customId": "att-44",
    "employeeId": "emp-44",
    "employeeName": "Deepinder Goyal",
    "date": "04-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:10",
    "workedHours": "9.08",
    "status": "Present",
    "department": "Engineering",
    "manager": "Rahul Dravid",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-45",
    "customId": "att-45",
    "employeeId": "emp-45",
    "employeeName": "Falguni Nayar",
    "date": "05-Sep-2026",
    "checkIn": "09:00",
    "checkOut": "13:30",
    "workedHours": "4.50",
    "status": "Half Day",
    "department": "Finance & Payroll",
    "manager": "Sara Khan",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": true
  },
  {
    "id": "att-46",
    "customId": "att-46",
    "employeeId": "emp-46",
    "employeeName": "Jaspreet Bumrah",
    "date": "01-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:40",
    "workedHours": "9.58",
    "status": "Present",
    "department": "Quality Assurance",
    "manager": "Tanvi Kulkarni",
    "overtime": "0.50 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-47",
    "customId": "att-47",
    "employeeId": "emp-47",
    "employeeName": "Vidya Balan",
    "date": "02-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:10",
    "workedHours": "9.08",
    "status": "Present",
    "department": "Human Resources",
    "manager": "Sara Khan",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-48",
    "customId": "att-48",
    "employeeId": "emp-48",
    "employeeName": "Sachin Tendulkar",
    "date": "03-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:10",
    "workedHours": "9.08",
    "status": "Present",
    "department": "Sales & Business Dev",
    "manager": "Rajesh Nair",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-49",
    "customId": "att-49",
    "employeeId": "emp-49",
    "employeeName": "Mithali Raj",
    "date": "04-Sep-2026",
    "checkIn": "09:05",
    "checkOut": "18:40",
    "workedHours": "9.58",
    "status": "Present",
    "department": "Operations & Admin",
    "manager": "Devendra Rao",
    "overtime": "0.50 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": false
  },
  {
    "id": "att-50",
    "customId": "att-50",
    "employeeId": "emp-50",
    "employeeName": "Boman Irani",
    "date": "05-Sep-2026",
    "checkIn": "10:15",
    "checkOut": "18:15",
    "workedHours": "8.00",
    "status": "Late",
    "department": "Operations & Admin",
    "manager": "Devendra Rao",
    "overtime": "0.00 hrs",
    "notes": "Recorded via automated biometric attendance integration.",
    "isManuallyEdited": true
  }
];

export const SEED_PAYRUNS = [
  {
    "id": "pr-1",
    "customId": "pr-1",
    "name": "January 2026",
    "structure": "Regular Salary",
    "periodStart": "2026-01-01",
    "periodEnd": "2026-01-31",
    "employeeCount": 10,
    "status": "Paid",
    "warningsCount": 1,
    "payslips": [
      {
        "id": "ps-1",
        "employeeId": "emp-1",
        "employeeName": "Aarav Mehta",
        "department": "Finance & Payroll",
        "contractWage": 85000,
        "workedDays": 22,
        "basic": 42500,
        "gross": 69500,
        "net": 61400,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-2",
        "employeeId": "emp-2",
        "employeeName": "Sara Khan",
        "department": "Human Resources",
        "contractWage": 95000,
        "workedDays": 22,
        "basic": 47500,
        "gross": 76500,
        "net": 67800,
        "status": "Paid",
        "warning": "A/C missing"
      },
      {
        "id": "ps-3",
        "employeeId": "emp-3",
        "employeeName": "John Dsouza",
        "department": "Engineering",
        "contractWage": 72000,
        "workedDays": 22,
        "basic": 72000,
        "gross": 72000,
        "net": 64800,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-4",
        "employeeId": "emp-4",
        "employeeName": "Neha Patel",
        "department": "Human Resources",
        "contractWage": 68000,
        "workedDays": 22,
        "basic": 34000,
        "gross": 57600,
        "net": 50520,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-5",
        "employeeId": "emp-5",
        "employeeName": "Rohan Patel",
        "department": "Engineering",
        "contractWage": 65000,
        "workedDays": 22,
        "basic": 35750,
        "gross": 73050,
        "net": 65760,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-6",
        "employeeId": "emp-6",
        "employeeName": "Vikram Malhotra",
        "department": "Engineering",
        "contractWage": 220000,
        "workedDays": 22,
        "basic": 121000,
        "gross": 192400,
        "net": 174880,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-7",
        "employeeId": "emp-7",
        "employeeName": "Priya Sharma",
        "department": "Product Management",
        "contractWage": 160000,
        "workedDays": 22,
        "basic": 80000,
        "gross": 122000,
        "net": 109400,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-8",
        "employeeId": "emp-8",
        "employeeName": "Aditya Kapoor",
        "department": "Engineering",
        "contractWage": 150000,
        "workedDays": 22,
        "basic": 82500,
        "gross": 138500,
        "net": 125600,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-9",
        "employeeId": "emp-9",
        "employeeName": "Ananya Iyer",
        "department": "Finance & Payroll",
        "contractWage": 110000,
        "workedDays": 22,
        "basic": 55000,
        "gross": 87000,
        "net": 77400,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-10",
        "employeeId": "emp-10",
        "employeeName": "Rajesh Nair",
        "department": "Sales & Business Dev",
        "contractWage": 240000,
        "workedDays": 22,
        "basic": 120000,
        "gross": 225000,
        "net": 207600,
        "status": "Paid",
        "warning": "—"
      }
    ]
  },
  {
    "id": "pr-2",
    "customId": "pr-2",
    "name": "February 2026",
    "structure": "Regular Salary",
    "periodStart": "2026-02-01",
    "periodEnd": "2026-02-28",
    "employeeCount": 11,
    "status": "Paid",
    "warningsCount": 1,
    "payslips": [
      {
        "id": "ps-11",
        "employeeId": "emp-1",
        "employeeName": "Aarav Mehta",
        "department": "Finance & Payroll",
        "contractWage": 85000,
        "workedDays": 22,
        "basic": 42500,
        "gross": 69500,
        "net": 61400,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-12",
        "employeeId": "emp-2",
        "employeeName": "Sara Khan",
        "department": "Human Resources",
        "contractWage": 95000,
        "workedDays": 22,
        "basic": 47500,
        "gross": 76500,
        "net": 67800,
        "status": "Paid",
        "warning": "A/C missing"
      },
      {
        "id": "ps-13",
        "employeeId": "emp-3",
        "employeeName": "John Dsouza",
        "department": "Engineering",
        "contractWage": 72000,
        "workedDays": 22,
        "basic": 72000,
        "gross": 72000,
        "net": 64800,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-14",
        "employeeId": "emp-4",
        "employeeName": "Neha Patel",
        "department": "Human Resources",
        "contractWage": 68000,
        "workedDays": 22,
        "basic": 34000,
        "gross": 57600,
        "net": 50520,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-15",
        "employeeId": "emp-5",
        "employeeName": "Rohan Patel",
        "department": "Engineering",
        "contractWage": 65000,
        "workedDays": 22,
        "basic": 35750,
        "gross": 73050,
        "net": 65760,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-16",
        "employeeId": "emp-6",
        "employeeName": "Vikram Malhotra",
        "department": "Engineering",
        "contractWage": 220000,
        "workedDays": 22,
        "basic": 121000,
        "gross": 192400,
        "net": 174880,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-17",
        "employeeId": "emp-7",
        "employeeName": "Priya Sharma",
        "department": "Product Management",
        "contractWage": 160000,
        "workedDays": 22,
        "basic": 80000,
        "gross": 122000,
        "net": 109400,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-18",
        "employeeId": "emp-8",
        "employeeName": "Aditya Kapoor",
        "department": "Engineering",
        "contractWage": 150000,
        "workedDays": 22,
        "basic": 82500,
        "gross": 138500,
        "net": 125600,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-19",
        "employeeId": "emp-9",
        "employeeName": "Ananya Iyer",
        "department": "Finance & Payroll",
        "contractWage": 110000,
        "workedDays": 22,
        "basic": 55000,
        "gross": 87000,
        "net": 77400,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-20",
        "employeeId": "emp-10",
        "employeeName": "Rajesh Nair",
        "department": "Sales & Business Dev",
        "contractWage": 240000,
        "workedDays": 22,
        "basic": 120000,
        "gross": 225000,
        "net": 207600,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-21",
        "employeeId": "emp-11",
        "employeeName": "Sneha Joshi",
        "department": "Marketing & Growth",
        "contractWage": 125000,
        "workedDays": 22,
        "basic": 62500,
        "gross": 97500,
        "net": 87000,
        "status": "Paid",
        "warning": "—"
      }
    ]
  },
  {
    "id": "pr-3",
    "customId": "pr-3",
    "name": "March 2026",
    "structure": "Regular Salary",
    "periodStart": "2026-03-01",
    "periodEnd": "2026-03-31",
    "employeeCount": 12,
    "status": "Paid",
    "warningsCount": 1,
    "payslips": [
      {
        "id": "ps-22",
        "employeeId": "emp-1",
        "employeeName": "Aarav Mehta",
        "department": "Finance & Payroll",
        "contractWage": 85000,
        "workedDays": 22,
        "basic": 42500,
        "gross": 69500,
        "net": 61400,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-23",
        "employeeId": "emp-2",
        "employeeName": "Sara Khan",
        "department": "Human Resources",
        "contractWage": 95000,
        "workedDays": 22,
        "basic": 47500,
        "gross": 76500,
        "net": 67800,
        "status": "Paid",
        "warning": "A/C missing"
      },
      {
        "id": "ps-24",
        "employeeId": "emp-3",
        "employeeName": "John Dsouza",
        "department": "Engineering",
        "contractWage": 72000,
        "workedDays": 22,
        "basic": 72000,
        "gross": 72000,
        "net": 64800,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-25",
        "employeeId": "emp-4",
        "employeeName": "Neha Patel",
        "department": "Human Resources",
        "contractWage": 68000,
        "workedDays": 22,
        "basic": 34000,
        "gross": 57600,
        "net": 50520,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-26",
        "employeeId": "emp-5",
        "employeeName": "Rohan Patel",
        "department": "Engineering",
        "contractWage": 65000,
        "workedDays": 22,
        "basic": 35750,
        "gross": 73050,
        "net": 65760,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-27",
        "employeeId": "emp-6",
        "employeeName": "Vikram Malhotra",
        "department": "Engineering",
        "contractWage": 220000,
        "workedDays": 22,
        "basic": 121000,
        "gross": 192400,
        "net": 174880,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-28",
        "employeeId": "emp-7",
        "employeeName": "Priya Sharma",
        "department": "Product Management",
        "contractWage": 160000,
        "workedDays": 22,
        "basic": 80000,
        "gross": 122000,
        "net": 109400,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-29",
        "employeeId": "emp-8",
        "employeeName": "Aditya Kapoor",
        "department": "Engineering",
        "contractWage": 150000,
        "workedDays": 22,
        "basic": 82500,
        "gross": 138500,
        "net": 125600,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-30",
        "employeeId": "emp-9",
        "employeeName": "Ananya Iyer",
        "department": "Finance & Payroll",
        "contractWage": 110000,
        "workedDays": 22,
        "basic": 55000,
        "gross": 87000,
        "net": 77400,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-31",
        "employeeId": "emp-10",
        "employeeName": "Rajesh Nair",
        "department": "Sales & Business Dev",
        "contractWage": 240000,
        "workedDays": 22,
        "basic": 120000,
        "gross": 225000,
        "net": 207600,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-32",
        "employeeId": "emp-11",
        "employeeName": "Sneha Joshi",
        "department": "Marketing & Growth",
        "contractWage": 125000,
        "workedDays": 22,
        "basic": 62500,
        "gross": 97500,
        "net": 87000,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-33",
        "employeeId": "emp-12",
        "employeeName": "Kabir Deshmukh",
        "department": "Customer Success",
        "contractWage": 130000,
        "workedDays": 22,
        "basic": 65000,
        "gross": 101000,
        "net": 90200,
        "status": "Paid",
        "warning": "—"
      }
    ]
  },
  {
    "id": "pr-4",
    "customId": "pr-4",
    "name": "April 2026",
    "structure": "Regular Salary",
    "periodStart": "2026-04-01",
    "periodEnd": "2026-04-30",
    "employeeCount": 13,
    "status": "Paid",
    "warningsCount": 1,
    "payslips": [
      {
        "id": "ps-34",
        "employeeId": "emp-1",
        "employeeName": "Aarav Mehta",
        "department": "Finance & Payroll",
        "contractWage": 85000,
        "workedDays": 22,
        "basic": 42500,
        "gross": 69500,
        "net": 61400,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-35",
        "employeeId": "emp-2",
        "employeeName": "Sara Khan",
        "department": "Human Resources",
        "contractWage": 95000,
        "workedDays": 22,
        "basic": 47500,
        "gross": 76500,
        "net": 67800,
        "status": "Paid",
        "warning": "A/C missing"
      },
      {
        "id": "ps-36",
        "employeeId": "emp-3",
        "employeeName": "John Dsouza",
        "department": "Engineering",
        "contractWage": 72000,
        "workedDays": 22,
        "basic": 72000,
        "gross": 72000,
        "net": 64800,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-37",
        "employeeId": "emp-4",
        "employeeName": "Neha Patel",
        "department": "Human Resources",
        "contractWage": 68000,
        "workedDays": 22,
        "basic": 34000,
        "gross": 57600,
        "net": 50520,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-38",
        "employeeId": "emp-5",
        "employeeName": "Rohan Patel",
        "department": "Engineering",
        "contractWage": 65000,
        "workedDays": 22,
        "basic": 35750,
        "gross": 73050,
        "net": 65760,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-39",
        "employeeId": "emp-6",
        "employeeName": "Vikram Malhotra",
        "department": "Engineering",
        "contractWage": 220000,
        "workedDays": 22,
        "basic": 121000,
        "gross": 192400,
        "net": 174880,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-40",
        "employeeId": "emp-7",
        "employeeName": "Priya Sharma",
        "department": "Product Management",
        "contractWage": 160000,
        "workedDays": 22,
        "basic": 80000,
        "gross": 122000,
        "net": 109400,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-41",
        "employeeId": "emp-8",
        "employeeName": "Aditya Kapoor",
        "department": "Engineering",
        "contractWage": 150000,
        "workedDays": 22,
        "basic": 82500,
        "gross": 138500,
        "net": 125600,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-42",
        "employeeId": "emp-9",
        "employeeName": "Ananya Iyer",
        "department": "Finance & Payroll",
        "contractWage": 110000,
        "workedDays": 22,
        "basic": 55000,
        "gross": 87000,
        "net": 77400,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-43",
        "employeeId": "emp-10",
        "employeeName": "Rajesh Nair",
        "department": "Sales & Business Dev",
        "contractWage": 240000,
        "workedDays": 22,
        "basic": 120000,
        "gross": 225000,
        "net": 207600,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-44",
        "employeeId": "emp-11",
        "employeeName": "Sneha Joshi",
        "department": "Marketing & Growth",
        "contractWage": 125000,
        "workedDays": 22,
        "basic": 62500,
        "gross": 97500,
        "net": 87000,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-45",
        "employeeId": "emp-12",
        "employeeName": "Kabir Deshmukh",
        "department": "Customer Success",
        "contractWage": 130000,
        "workedDays": 22,
        "basic": 65000,
        "gross": 101000,
        "net": 90200,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-46",
        "employeeId": "emp-13",
        "employeeName": "Meera Sen",
        "department": "Engineering",
        "contractWage": 82000,
        "workedDays": 22,
        "basic": 45100,
        "gross": 86140,
        "net": 77728,
        "status": "Paid",
        "warning": "—"
      }
    ]
  },
  {
    "id": "pr-5",
    "customId": "pr-5",
    "name": "May 2026",
    "structure": "Regular Salary",
    "periodStart": "2026-05-01",
    "periodEnd": "2026-05-31",
    "employeeCount": 14,
    "status": "Paid",
    "warningsCount": 1,
    "payslips": [
      {
        "id": "ps-47",
        "employeeId": "emp-1",
        "employeeName": "Aarav Mehta",
        "department": "Finance & Payroll",
        "contractWage": 85000,
        "workedDays": 22,
        "basic": 42500,
        "gross": 69500,
        "net": 61400,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-48",
        "employeeId": "emp-2",
        "employeeName": "Sara Khan",
        "department": "Human Resources",
        "contractWage": 95000,
        "workedDays": 22,
        "basic": 47500,
        "gross": 76500,
        "net": 67800,
        "status": "Paid",
        "warning": "A/C missing"
      },
      {
        "id": "ps-49",
        "employeeId": "emp-3",
        "employeeName": "John Dsouza",
        "department": "Engineering",
        "contractWage": 72000,
        "workedDays": 22,
        "basic": 72000,
        "gross": 72000,
        "net": 64800,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-50",
        "employeeId": "emp-4",
        "employeeName": "Neha Patel",
        "department": "Human Resources",
        "contractWage": 68000,
        "workedDays": 22,
        "basic": 34000,
        "gross": 57600,
        "net": 50520,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-51",
        "employeeId": "emp-5",
        "employeeName": "Rohan Patel",
        "department": "Engineering",
        "contractWage": 65000,
        "workedDays": 22,
        "basic": 35750,
        "gross": 73050,
        "net": 65760,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-52",
        "employeeId": "emp-6",
        "employeeName": "Vikram Malhotra",
        "department": "Engineering",
        "contractWage": 220000,
        "workedDays": 22,
        "basic": 121000,
        "gross": 192400,
        "net": 174880,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-53",
        "employeeId": "emp-7",
        "employeeName": "Priya Sharma",
        "department": "Product Management",
        "contractWage": 160000,
        "workedDays": 22,
        "basic": 80000,
        "gross": 122000,
        "net": 109400,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-54",
        "employeeId": "emp-8",
        "employeeName": "Aditya Kapoor",
        "department": "Engineering",
        "contractWage": 150000,
        "workedDays": 22,
        "basic": 82500,
        "gross": 138500,
        "net": 125600,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-55",
        "employeeId": "emp-9",
        "employeeName": "Ananya Iyer",
        "department": "Finance & Payroll",
        "contractWage": 110000,
        "workedDays": 22,
        "basic": 55000,
        "gross": 87000,
        "net": 77400,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-56",
        "employeeId": "emp-10",
        "employeeName": "Rajesh Nair",
        "department": "Sales & Business Dev",
        "contractWage": 240000,
        "workedDays": 22,
        "basic": 120000,
        "gross": 225000,
        "net": 207600,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-57",
        "employeeId": "emp-11",
        "employeeName": "Sneha Joshi",
        "department": "Marketing & Growth",
        "contractWage": 125000,
        "workedDays": 22,
        "basic": 62500,
        "gross": 97500,
        "net": 87000,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-58",
        "employeeId": "emp-12",
        "employeeName": "Kabir Deshmukh",
        "department": "Customer Success",
        "contractWage": 130000,
        "workedDays": 22,
        "basic": 65000,
        "gross": 101000,
        "net": 90200,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-59",
        "employeeId": "emp-13",
        "employeeName": "Meera Sen",
        "department": "Engineering",
        "contractWage": 82000,
        "workedDays": 22,
        "basic": 45100,
        "gross": 86140,
        "net": 77728,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-60",
        "employeeId": "emp-14",
        "employeeName": "Devendra Rao",
        "department": "Operations & Admin",
        "contractWage": 175000,
        "workedDays": 22,
        "basic": 87500,
        "gross": 176250,
        "net": 162750,
        "status": "Paid",
        "warning": "—"
      }
    ]
  },
  {
    "id": "pr-6",
    "customId": "pr-6",
    "name": "June 2026",
    "structure": "Regular Salary",
    "periodStart": "2026-06-01",
    "periodEnd": "2026-06-30",
    "employeeCount": 15,
    "status": "Paid",
    "warningsCount": 1,
    "payslips": [
      {
        "id": "ps-61",
        "employeeId": "emp-1",
        "employeeName": "Aarav Mehta",
        "department": "Finance & Payroll",
        "contractWage": 85000,
        "workedDays": 22,
        "basic": 42500,
        "gross": 69500,
        "net": 61400,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-62",
        "employeeId": "emp-2",
        "employeeName": "Sara Khan",
        "department": "Human Resources",
        "contractWage": 95000,
        "workedDays": 22,
        "basic": 47500,
        "gross": 76500,
        "net": 67800,
        "status": "Paid",
        "warning": "A/C missing"
      },
      {
        "id": "ps-63",
        "employeeId": "emp-3",
        "employeeName": "John Dsouza",
        "department": "Engineering",
        "contractWage": 72000,
        "workedDays": 22,
        "basic": 72000,
        "gross": 72000,
        "net": 64800,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-64",
        "employeeId": "emp-4",
        "employeeName": "Neha Patel",
        "department": "Human Resources",
        "contractWage": 68000,
        "workedDays": 22,
        "basic": 34000,
        "gross": 57600,
        "net": 50520,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-65",
        "employeeId": "emp-5",
        "employeeName": "Rohan Patel",
        "department": "Engineering",
        "contractWage": 65000,
        "workedDays": 22,
        "basic": 35750,
        "gross": 73050,
        "net": 65760,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-66",
        "employeeId": "emp-6",
        "employeeName": "Vikram Malhotra",
        "department": "Engineering",
        "contractWage": 220000,
        "workedDays": 22,
        "basic": 121000,
        "gross": 192400,
        "net": 174880,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-67",
        "employeeId": "emp-7",
        "employeeName": "Priya Sharma",
        "department": "Product Management",
        "contractWage": 160000,
        "workedDays": 22,
        "basic": 80000,
        "gross": 122000,
        "net": 109400,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-68",
        "employeeId": "emp-8",
        "employeeName": "Aditya Kapoor",
        "department": "Engineering",
        "contractWage": 150000,
        "workedDays": 22,
        "basic": 82500,
        "gross": 138500,
        "net": 125600,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-69",
        "employeeId": "emp-9",
        "employeeName": "Ananya Iyer",
        "department": "Finance & Payroll",
        "contractWage": 110000,
        "workedDays": 22,
        "basic": 55000,
        "gross": 87000,
        "net": 77400,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-70",
        "employeeId": "emp-10",
        "employeeName": "Rajesh Nair",
        "department": "Sales & Business Dev",
        "contractWage": 240000,
        "workedDays": 22,
        "basic": 120000,
        "gross": 225000,
        "net": 207600,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-71",
        "employeeId": "emp-11",
        "employeeName": "Sneha Joshi",
        "department": "Marketing & Growth",
        "contractWage": 125000,
        "workedDays": 22,
        "basic": 62500,
        "gross": 97500,
        "net": 87000,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-72",
        "employeeId": "emp-12",
        "employeeName": "Kabir Deshmukh",
        "department": "Customer Success",
        "contractWage": 130000,
        "workedDays": 22,
        "basic": 65000,
        "gross": 101000,
        "net": 90200,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-73",
        "employeeId": "emp-13",
        "employeeName": "Meera Sen",
        "department": "Engineering",
        "contractWage": 82000,
        "workedDays": 22,
        "basic": 45100,
        "gross": 86140,
        "net": 77728,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-74",
        "employeeId": "emp-14",
        "employeeName": "Devendra Rao",
        "department": "Operations & Admin",
        "contractWage": 175000,
        "workedDays": 22,
        "basic": 87500,
        "gross": 176250,
        "net": 162750,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-75",
        "employeeId": "emp-15",
        "employeeName": "Ishaan Bhat",
        "department": "Engineering",
        "contractWage": 95000,
        "workedDays": 22,
        "basic": 52250,
        "gross": 96150,
        "net": 86880,
        "status": "Paid",
        "warning": "—"
      }
    ]
  },
  {
    "id": "pr-7",
    "customId": "pr-7",
    "name": "July 2026",
    "structure": "Regular Salary",
    "periodStart": "2026-07-01",
    "periodEnd": "2026-07-31",
    "employeeCount": 16,
    "status": "Paid",
    "warningsCount": 1,
    "payslips": [
      {
        "id": "ps-76",
        "employeeId": "emp-1",
        "employeeName": "Aarav Mehta",
        "department": "Finance & Payroll",
        "contractWage": 85000,
        "workedDays": 22,
        "basic": 42500,
        "gross": 69500,
        "net": 61400,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-77",
        "employeeId": "emp-2",
        "employeeName": "Sara Khan",
        "department": "Human Resources",
        "contractWage": 95000,
        "workedDays": 22,
        "basic": 47500,
        "gross": 76500,
        "net": 67800,
        "status": "Paid",
        "warning": "A/C missing"
      },
      {
        "id": "ps-78",
        "employeeId": "emp-3",
        "employeeName": "John Dsouza",
        "department": "Engineering",
        "contractWage": 72000,
        "workedDays": 22,
        "basic": 72000,
        "gross": 72000,
        "net": 64800,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-79",
        "employeeId": "emp-4",
        "employeeName": "Neha Patel",
        "department": "Human Resources",
        "contractWage": 68000,
        "workedDays": 22,
        "basic": 34000,
        "gross": 57600,
        "net": 50520,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-80",
        "employeeId": "emp-5",
        "employeeName": "Rohan Patel",
        "department": "Engineering",
        "contractWage": 65000,
        "workedDays": 22,
        "basic": 35750,
        "gross": 73050,
        "net": 65760,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-81",
        "employeeId": "emp-6",
        "employeeName": "Vikram Malhotra",
        "department": "Engineering",
        "contractWage": 220000,
        "workedDays": 22,
        "basic": 121000,
        "gross": 192400,
        "net": 174880,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-82",
        "employeeId": "emp-7",
        "employeeName": "Priya Sharma",
        "department": "Product Management",
        "contractWage": 160000,
        "workedDays": 22,
        "basic": 80000,
        "gross": 122000,
        "net": 109400,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-83",
        "employeeId": "emp-8",
        "employeeName": "Aditya Kapoor",
        "department": "Engineering",
        "contractWage": 150000,
        "workedDays": 22,
        "basic": 82500,
        "gross": 138500,
        "net": 125600,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-84",
        "employeeId": "emp-9",
        "employeeName": "Ananya Iyer",
        "department": "Finance & Payroll",
        "contractWage": 110000,
        "workedDays": 22,
        "basic": 55000,
        "gross": 87000,
        "net": 77400,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-85",
        "employeeId": "emp-10",
        "employeeName": "Rajesh Nair",
        "department": "Sales & Business Dev",
        "contractWage": 240000,
        "workedDays": 22,
        "basic": 120000,
        "gross": 225000,
        "net": 207600,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-86",
        "employeeId": "emp-11",
        "employeeName": "Sneha Joshi",
        "department": "Marketing & Growth",
        "contractWage": 125000,
        "workedDays": 22,
        "basic": 62500,
        "gross": 97500,
        "net": 87000,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-87",
        "employeeId": "emp-12",
        "employeeName": "Kabir Deshmukh",
        "department": "Customer Success",
        "contractWage": 130000,
        "workedDays": 22,
        "basic": 65000,
        "gross": 101000,
        "net": 90200,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-88",
        "employeeId": "emp-13",
        "employeeName": "Meera Sen",
        "department": "Engineering",
        "contractWage": 82000,
        "workedDays": 22,
        "basic": 45100,
        "gross": 86140,
        "net": 77728,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-89",
        "employeeId": "emp-14",
        "employeeName": "Devendra Rao",
        "department": "Operations & Admin",
        "contractWage": 175000,
        "workedDays": 22,
        "basic": 87500,
        "gross": 176250,
        "net": 162750,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-90",
        "employeeId": "emp-15",
        "employeeName": "Ishaan Bhat",
        "department": "Engineering",
        "contractWage": 95000,
        "workedDays": 22,
        "basic": 52250,
        "gross": 96150,
        "net": 86880,
        "status": "Paid",
        "warning": "—"
      },
      {
        "id": "ps-91",
        "employeeId": "emp-16",
        "employeeName": "Tanvi Kulkarni",
        "department": "Quality Assurance",
        "contractWage": 115000,
        "workedDays": 22,
        "basic": 57500,
        "gross": 90500,
        "net": 80600,
        "status": "Paid",
        "warning": "—"
      }
    ]
  },
  {
    "id": "pr-8",
    "customId": "pr-8",
    "name": "August 2026",
    "structure": "Regular Salary",
    "periodStart": "2026-08-01",
    "periodEnd": "2026-08-31",
    "employeeCount": 17,
    "status": "Validated",
    "warningsCount": 1,
    "payslips": [
      {
        "id": "ps-92",
        "employeeId": "emp-1",
        "employeeName": "Aarav Mehta",
        "department": "Finance & Payroll",
        "contractWage": 85000,
        "workedDays": 22,
        "basic": 42500,
        "gross": 69500,
        "net": 61400,
        "status": "Validated",
        "warning": "—"
      },
      {
        "id": "ps-93",
        "employeeId": "emp-2",
        "employeeName": "Sara Khan",
        "department": "Human Resources",
        "contractWage": 95000,
        "workedDays": 22,
        "basic": 47500,
        "gross": 76500,
        "net": 67800,
        "status": "Validated",
        "warning": "A/C missing"
      },
      {
        "id": "ps-94",
        "employeeId": "emp-3",
        "employeeName": "John Dsouza",
        "department": "Engineering",
        "contractWage": 72000,
        "workedDays": 22,
        "basic": 72000,
        "gross": 72000,
        "net": 64800,
        "status": "Validated",
        "warning": "—"
      },
      {
        "id": "ps-95",
        "employeeId": "emp-4",
        "employeeName": "Neha Patel",
        "department": "Human Resources",
        "contractWage": 68000,
        "workedDays": 22,
        "basic": 34000,
        "gross": 57600,
        "net": 50520,
        "status": "Validated",
        "warning": "—"
      },
      {
        "id": "ps-96",
        "employeeId": "emp-5",
        "employeeName": "Rohan Patel",
        "department": "Engineering",
        "contractWage": 65000,
        "workedDays": 22,
        "basic": 35750,
        "gross": 73050,
        "net": 65760,
        "status": "Validated",
        "warning": "—"
      },
      {
        "id": "ps-97",
        "employeeId": "emp-6",
        "employeeName": "Vikram Malhotra",
        "department": "Engineering",
        "contractWage": 220000,
        "workedDays": 22,
        "basic": 121000,
        "gross": 192400,
        "net": 174880,
        "status": "Validated",
        "warning": "—"
      },
      {
        "id": "ps-98",
        "employeeId": "emp-7",
        "employeeName": "Priya Sharma",
        "department": "Product Management",
        "contractWage": 160000,
        "workedDays": 22,
        "basic": 80000,
        "gross": 122000,
        "net": 109400,
        "status": "Validated",
        "warning": "—"
      },
      {
        "id": "ps-99",
        "employeeId": "emp-8",
        "employeeName": "Aditya Kapoor",
        "department": "Engineering",
        "contractWage": 150000,
        "workedDays": 22,
        "basic": 82500,
        "gross": 138500,
        "net": 125600,
        "status": "Validated",
        "warning": "—"
      },
      {
        "id": "ps-100",
        "employeeId": "emp-9",
        "employeeName": "Ananya Iyer",
        "department": "Finance & Payroll",
        "contractWage": 110000,
        "workedDays": 22,
        "basic": 55000,
        "gross": 87000,
        "net": 77400,
        "status": "Validated",
        "warning": "—"
      },
      {
        "id": "ps-101",
        "employeeId": "emp-10",
        "employeeName": "Rajesh Nair",
        "department": "Sales & Business Dev",
        "contractWage": 240000,
        "workedDays": 22,
        "basic": 120000,
        "gross": 225000,
        "net": 207600,
        "status": "Validated",
        "warning": "—"
      },
      {
        "id": "ps-102",
        "employeeId": "emp-11",
        "employeeName": "Sneha Joshi",
        "department": "Marketing & Growth",
        "contractWage": 125000,
        "workedDays": 22,
        "basic": 62500,
        "gross": 97500,
        "net": 87000,
        "status": "Validated",
        "warning": "—"
      },
      {
        "id": "ps-103",
        "employeeId": "emp-12",
        "employeeName": "Kabir Deshmukh",
        "department": "Customer Success",
        "contractWage": 130000,
        "workedDays": 22,
        "basic": 65000,
        "gross": 101000,
        "net": 90200,
        "status": "Validated",
        "warning": "—"
      },
      {
        "id": "ps-104",
        "employeeId": "emp-13",
        "employeeName": "Meera Sen",
        "department": "Engineering",
        "contractWage": 82000,
        "workedDays": 22,
        "basic": 45100,
        "gross": 86140,
        "net": 77728,
        "status": "Validated",
        "warning": "—"
      },
      {
        "id": "ps-105",
        "employeeId": "emp-14",
        "employeeName": "Devendra Rao",
        "department": "Operations & Admin",
        "contractWage": 175000,
        "workedDays": 22,
        "basic": 87500,
        "gross": 176250,
        "net": 162750,
        "status": "Validated",
        "warning": "—"
      },
      {
        "id": "ps-106",
        "employeeId": "emp-15",
        "employeeName": "Ishaan Bhat",
        "department": "Engineering",
        "contractWage": 95000,
        "workedDays": 22,
        "basic": 52250,
        "gross": 96150,
        "net": 86880,
        "status": "Validated",
        "warning": "—"
      },
      {
        "id": "ps-107",
        "employeeId": "emp-16",
        "employeeName": "Tanvi Kulkarni",
        "department": "Quality Assurance",
        "contractWage": 115000,
        "workedDays": 22,
        "basic": 57500,
        "gross": 90500,
        "net": 80600,
        "status": "Validated",
        "warning": "—"
      },
      {
        "id": "ps-108",
        "employeeId": "emp-17",
        "employeeName": "Siddharth Varma",
        "department": "Engineering",
        "contractWage": 88000,
        "workedDays": 22,
        "basic": 48400,
        "gross": 90760,
        "net": 81952,
        "status": "Validated",
        "warning": "—"
      }
    ]
  },
  {
    "id": "pr-9",
    "customId": "pr-9",
    "name": "September 2026",
    "structure": "Regular Salary",
    "periodStart": "2026-09-01",
    "periodEnd": "2026-09-30",
    "employeeCount": 18,
    "status": "Draft",
    "warningsCount": 1,
    "payslips": [
      {
        "id": "ps-109",
        "employeeId": "emp-1",
        "employeeName": "Aarav Mehta",
        "department": "Finance & Payroll",
        "contractWage": 85000,
        "workedDays": 22,
        "basic": 42500,
        "gross": 69500,
        "net": 61400,
        "status": "Draft",
        "warning": "—"
      },
      {
        "id": "ps-110",
        "employeeId": "emp-2",
        "employeeName": "Sara Khan",
        "department": "Human Resources",
        "contractWage": 95000,
        "workedDays": 22,
        "basic": 47500,
        "gross": 76500,
        "net": 67800,
        "status": "Draft",
        "warning": "A/C missing"
      },
      {
        "id": "ps-111",
        "employeeId": "emp-3",
        "employeeName": "John Dsouza",
        "department": "Engineering",
        "contractWage": 72000,
        "workedDays": 22,
        "basic": 72000,
        "gross": 72000,
        "net": 64800,
        "status": "Draft",
        "warning": "—"
      },
      {
        "id": "ps-112",
        "employeeId": "emp-4",
        "employeeName": "Neha Patel",
        "department": "Human Resources",
        "contractWage": 68000,
        "workedDays": 22,
        "basic": 34000,
        "gross": 57600,
        "net": 50520,
        "status": "Draft",
        "warning": "—"
      },
      {
        "id": "ps-113",
        "employeeId": "emp-5",
        "employeeName": "Rohan Patel",
        "department": "Engineering",
        "contractWage": 65000,
        "workedDays": 22,
        "basic": 35750,
        "gross": 73050,
        "net": 65760,
        "status": "Draft",
        "warning": "—"
      },
      {
        "id": "ps-114",
        "employeeId": "emp-6",
        "employeeName": "Vikram Malhotra",
        "department": "Engineering",
        "contractWage": 220000,
        "workedDays": 22,
        "basic": 121000,
        "gross": 192400,
        "net": 174880,
        "status": "Draft",
        "warning": "—"
      },
      {
        "id": "ps-115",
        "employeeId": "emp-7",
        "employeeName": "Priya Sharma",
        "department": "Product Management",
        "contractWage": 160000,
        "workedDays": 22,
        "basic": 80000,
        "gross": 122000,
        "net": 109400,
        "status": "Draft",
        "warning": "—"
      },
      {
        "id": "ps-116",
        "employeeId": "emp-8",
        "employeeName": "Aditya Kapoor",
        "department": "Engineering",
        "contractWage": 150000,
        "workedDays": 22,
        "basic": 82500,
        "gross": 138500,
        "net": 125600,
        "status": "Draft",
        "warning": "—"
      },
      {
        "id": "ps-117",
        "employeeId": "emp-9",
        "employeeName": "Ananya Iyer",
        "department": "Finance & Payroll",
        "contractWage": 110000,
        "workedDays": 22,
        "basic": 55000,
        "gross": 87000,
        "net": 77400,
        "status": "Draft",
        "warning": "—"
      },
      {
        "id": "ps-118",
        "employeeId": "emp-10",
        "employeeName": "Rajesh Nair",
        "department": "Sales & Business Dev",
        "contractWage": 240000,
        "workedDays": 22,
        "basic": 120000,
        "gross": 225000,
        "net": 207600,
        "status": "Draft",
        "warning": "—"
      },
      {
        "id": "ps-119",
        "employeeId": "emp-11",
        "employeeName": "Sneha Joshi",
        "department": "Marketing & Growth",
        "contractWage": 125000,
        "workedDays": 22,
        "basic": 62500,
        "gross": 97500,
        "net": 87000,
        "status": "Draft",
        "warning": "—"
      },
      {
        "id": "ps-120",
        "employeeId": "emp-12",
        "employeeName": "Kabir Deshmukh",
        "department": "Customer Success",
        "contractWage": 130000,
        "workedDays": 22,
        "basic": 65000,
        "gross": 101000,
        "net": 90200,
        "status": "Draft",
        "warning": "—"
      },
      {
        "id": "ps-121",
        "employeeId": "emp-13",
        "employeeName": "Meera Sen",
        "department": "Engineering",
        "contractWage": 82000,
        "workedDays": 22,
        "basic": 45100,
        "gross": 86140,
        "net": 77728,
        "status": "Draft",
        "warning": "—"
      },
      {
        "id": "ps-122",
        "employeeId": "emp-14",
        "employeeName": "Devendra Rao",
        "department": "Operations & Admin",
        "contractWage": 175000,
        "workedDays": 22,
        "basic": 87500,
        "gross": 176250,
        "net": 162750,
        "status": "Draft",
        "warning": "—"
      },
      {
        "id": "ps-123",
        "employeeId": "emp-15",
        "employeeName": "Ishaan Bhat",
        "department": "Engineering",
        "contractWage": 95000,
        "workedDays": 22,
        "basic": 52250,
        "gross": 96150,
        "net": 86880,
        "status": "Draft",
        "warning": "—"
      },
      {
        "id": "ps-124",
        "employeeId": "emp-16",
        "employeeName": "Tanvi Kulkarni",
        "department": "Quality Assurance",
        "contractWage": 115000,
        "workedDays": 22,
        "basic": 57500,
        "gross": 90500,
        "net": 80600,
        "status": "Draft",
        "warning": "—"
      },
      {
        "id": "ps-125",
        "employeeId": "emp-17",
        "employeeName": "Siddharth Varma",
        "department": "Engineering",
        "contractWage": 88000,
        "workedDays": 22,
        "basic": 48400,
        "gross": 90760,
        "net": 81952,
        "status": "Draft",
        "warning": "—"
      },
      {
        "id": "ps-126",
        "employeeId": "emp-18",
        "employeeName": "Pooja Hegde",
        "department": "Human Resources",
        "contractWage": 70000,
        "workedDays": 22,
        "basic": 35000,
        "gross": 59000,
        "net": 51800,
        "status": "Draft",
        "warning": "—"
      }
    ]
  }
];

// --- STORE IMPLEMENTATION ---

class DataStore {
  constructor() {
    this.listeners = new Set();
    this.data = this.load();
  }

  load() {
    try {
      if (typeof localStorage !== 'undefined') {
        const serialized = localStorage.getItem(STORAGE_KEY);
        if (serialized) {
          const parsed = JSON.parse(serialized);
          return {
            workingSchedules: parsed.workingSchedules || SEED_WORKING_SCHEDULES,
            employees: parsed.employees || SEED_EMPLOYEES,
            contracts: parsed.contracts || SEED_CONTRACTS,
            timeOffTypes: parsed.timeOffTypes || SEED_TIMEOFF_TYPES,
            allocations: parsed.allocations || SEED_ALLOCATIONS,
            timeOffRequests: parsed.timeOffRequests || SEED_TIMEOFF_REQUESTS,
            salaryStructures: parsed.salaryStructures || SEED_SALARY_STRUCTURES,
            attendance: parsed.attendance || SEED_ATTENDANCE,
            payruns: parsed.payruns || SEED_PAYRUNS
          };
        }
      }
    } catch (e) {
      console.warn('Error reading from localStorage, using seed data', e);
    }
    return {
      workingSchedules: SEED_WORKING_SCHEDULES,
      employees: SEED_EMPLOYEES,
      contracts: SEED_CONTRACTS,
      timeOffTypes: SEED_TIMEOFF_TYPES,
      allocations: SEED_ALLOCATIONS,
      timeOffRequests: SEED_TIMEOFF_REQUESTS,
      salaryStructures: SEED_SALARY_STRUCTURES,
      attendance: SEED_ATTENDANCE,
      payruns: SEED_PAYRUNS
    };
  }

  save() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      }
    } catch (e) {
      console.error('Error saving data to localStorage', e);
    }
    this.notify();
  }

  resetToSeedData() {
    this.data = {
      workingSchedules: SEED_WORKING_SCHEDULES,
      employees: SEED_EMPLOYEES,
      contracts: SEED_CONTRACTS,
      timeOffTypes: SEED_TIMEOFF_TYPES,
      allocations: SEED_ALLOCATIONS,
      timeOffRequests: SEED_TIMEOFF_REQUESTS,
      salaryStructures: SEED_SALARY_STRUCTURES,
      attendance: SEED_ATTENDANCE,
      payruns: SEED_PAYRUNS
    };
    this.save();
    return this.data;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((l) => l(this.data));
  }

  // --- Working Schedules (A3) ---
  getWorkingSchedules() {
    return this.data.workingSchedules;
  }

  calculateWeeklyHours(days) {
    if (!days || !Array.isArray(days)) return 0;
    return days.reduce((acc, day) => {
      if (!day.active || !day.startTime || !day.endTime) return acc;
      const [sh, sm] = day.startTime.split(':').map(Number);
      const [eh, em] = day.endTime.split(':').map(Number);
      const startMinutes = sh * 60 + sm;
      const endMinutes = eh * 60 + em;
      let durationHours = (endMinutes - startMinutes) / 60;
      if (durationHours < 0) durationHours += 24;
      const netHours = Math.max(0, durationHours - (Number(day.breakHours) || 0));
      return acc + netHours;
    }, 0);
  }

  saveWorkingSchedule(schedule) {
    const totalHours = this.calculateWeeklyHours(schedule.days);
    const updatedSchedule = {
      ...schedule,
      weeklyHours: Number(totalHours.toFixed(1)),
      daysPerWeek: schedule.days.filter((d) => d.active).length
    };

    const existingIdx = this.data.workingSchedules.findIndex((s) => s.id === schedule.id);
    if (existingIdx >= 0) {
      this.data.workingSchedules[existingIdx] = updatedSchedule;
    } else {
      this.data.workingSchedules.push({
        ...updatedSchedule,
        id: schedule.id || `ws-${Date.now()}`
      });
    }
    this.save();
    return updatedSchedule;
  }

  deleteWorkingSchedule(id) {
    this.data.workingSchedules = this.data.workingSchedules.filter((s) => s.id !== id);
    this.save();
  }

  // --- Departments ---
  getDepartments() {
    if (this.data.departments && this.data.departments.length > 0) {
      return this.data.departments;
    }
    const set = new Set();
    const depts = [];
    (this.data.employees || []).forEach((e) => {
      if (e.department && !set.has(e.department)) {
        set.add(e.department);
        depts.push({ id: `dept-${depts.length + 1}`, name: e.department });
      }
    });
    return depts;
  }

  // --- Employees (A1) ---
  getEmployees() {
    return this.data.employees;
  }

  saveEmployee(employee) {
    let schedName = employee.workingSchedule;
    if (employee.workingScheduleId) {
      const ws = this.data.workingSchedules.find((s) => s.id === employee.workingScheduleId);
      if (ws) schedName = ws.name;
    }

    const initials = employee.name
      ? employee.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
      : 'EM';

    const complete = {
      ...employee,
      initials,
      workingSchedule: schedName || 'Standard 40 Hours'
    };

    const idx = this.data.employees.findIndex((e) => e.id === employee.id);
    if (idx >= 0) {
      this.data.employees[idx] = { ...this.data.employees[idx], ...complete };
    } else {
      this.data.employees.push({
        ...complete,
        id: employee.id || `emp-${Date.now()}`,
        contractsCount: 1,
        attendanceCount: 0,
        timeOffCount: 0
      });
    }
    this.save();
  }

  // --- Contracts (A2) ---
  getContracts() {
    return this.data.contracts;
  }

  saveContract(contract) {
    const idx = this.data.contracts.findIndex((c) => c.id === contract.id);
    if (idx >= 0) {
      this.data.contracts[idx] = { ...this.data.contracts[idx], ...contract };
    } else {
      this.data.contracts.push({
        ...contract,
        id: contract.id || `con-${Date.now()}`
      });
    }
    this.save();
  }

  getContractForPeriod(employeeIdOrName, periodStart, periodEnd) {
    const pStart = new Date(periodStart);
    const pEnd = new Date(periodEnd);

    const empContracts = (this.data.contracts || []).filter(
      (c) => c.employeeId === employeeIdOrName || (c.employeeName && employeeIdOrName && c.employeeName.toLowerCase().trim() === String(employeeIdOrName).toLowerCase().trim())
    );

    const applicable = empContracts.filter((c) => {
      if (c.status !== 'Running') return false;
      const cStart = new Date(c.startDate);
      const cEnd = c.endDate ? new Date(c.endDate) : new Date('2099-12-31');
      return cStart <= pEnd && cEnd >= pStart;
    });

    return {
      contracts: applicable,
      isConcurrentError: applicable.length > 1,
      contract: applicable.length === 1 ? applicable[0] : null
    };
  }

  // --- Time Off Types & Allocations & Requests (A4) ---
  getTimeOffTypes() {
    return this.data.timeOffTypes;
  }

  saveTimeOffType(tot) {
    const idx = this.data.timeOffTypes.findIndex((t) => t.id === tot.id);
    if (idx >= 0) {
      this.data.timeOffTypes[idx] = { ...this.data.timeOffTypes[idx], ...tot };
    } else {
      this.data.timeOffTypes.push({
        ...tot,
        id: tot.id || `tot-${Date.now()}`
      });
    }
    this.save();
  }

  getAllocations() {
    return this.data.allocations;
  }

  saveAllocation(allocation) {
    const idx = this.data.allocations.findIndex((a) => a.id === allocation.id);
    const rem = Number(allocation.allocated) - Number(allocation.taken || 0);
    const complete = {
      ...allocation,
      remaining: Math.max(0, rem),
      deductionLog: allocation.deductionLog || []
    };

    if (idx >= 0) {
      this.data.allocations[idx] = { ...this.data.allocations[idx], ...complete };
    } else {
      this.data.allocations.push({
        ...complete,
        id: allocation.id || `alc-${Date.now()}`
      });
    }
    this.save();
  }

  getTimeOffRequests() {
    return this.data.timeOffRequests;
  }

  saveTimeOffRequest(request) {
    const idx = this.data.timeOffRequests.findIndex((r) => r.id === request.id);
    if (idx >= 0) {
      this.data.timeOffRequests[idx] = { ...this.data.timeOffRequests[idx], ...request };
    } else {
      this.data.timeOffRequests.unshift({
        ...request,
        id: request.id || `req-${Date.now()}`
      });
    }
    this.save();
  }

  updateRequestStatus(requestId, newStatus) {
    const req = this.data.timeOffRequests.find((r) => r.id === requestId);
    if (!req) return;

    const previousStatus = req.status;
    req.status = newStatus;

    const leaveTypeObj = this.data.timeOffTypes.find((t) => t.name === req.type);
    const requiresAllocation = !leaveTypeObj || leaveTypeObj.allocation !== 'No';

    if (requiresAllocation) {
      const matchingAlc = this.data.allocations.find(
        (a) =>
          (a.employeeName.toLowerCase() === req.employeeName.toLowerCase() || a.employeeId === req.employeeId) &&
          a.type === req.type &&
          a.status === 'Approved'
      );

      const durationNum = parseFloat(req.duration) || 1;

      if (matchingAlc) {
        if (newStatus === 'Approved' && previousStatus !== 'Approved') {
          matchingAlc.taken = (Number(matchingAlc.taken) || 0) + durationNum;
          matchingAlc.remaining = Math.max(0, Number(matchingAlc.allocated) - matchingAlc.taken);
          if (!matchingAlc.deductionLog) matchingAlc.deductionLog = [];
          matchingAlc.deductionLog.push({
            requestId: req.id,
            duration: durationNum,
            date: req.startDate,
            note: req.reason || 'Approved leave deduction'
          });
          req.allocationUsed = `${matchingAlc.type} (${matchingAlc.validity}) [Deducted ${durationNum} ${matchingAlc.unit}]`;
        } else if (previousStatus === 'Approved' && (newStatus === 'Refused' || newStatus === 'To Approve')) {
          matchingAlc.taken = Math.max(0, (Number(matchingAlc.taken) || 0) - durationNum);
          matchingAlc.remaining = Math.max(0, Number(matchingAlc.allocated) - matchingAlc.taken);
          if (matchingAlc.deductionLog) {
            matchingAlc.deductionLog = matchingAlc.deductionLog.filter((l) => l.requestId !== req.id);
          }
          req.allocationUsed = `${matchingAlc.type} (${matchingAlc.validity}) [Restored]`;
        }
      }
    }

    this.save();
  }

  // --- Salary Structures & Rules (A5 & A6) ---
  getSalaryStructures() {
    return this.data.salaryStructures;
  }

  saveSalaryStructure(structure) {
    const idx = this.data.salaryStructures.findIndex((s) => s.id === structure.id);
    const complete = {
      ...structure,
      rulesCount: structure.rules?.length || 0
    };
    if (idx >= 0) {
      this.data.salaryStructures[idx] = { ...this.data.salaryStructures[idx], ...complete };
    } else {
      this.data.salaryStructures.push({
        ...complete,
        id: structure.id || `str-${Date.now()}`
      });
    }
    this.save();
  }

  getAllSalaryRules() {
    const all = [];
    this.data.salaryStructures.forEach((struct) => {
      if (struct.rules) {
        struct.rules.forEach((r) => {
          all.push({ ...r, structure: struct.name, structureId: struct.id });
        });
      }
    });
    return all.sort((a, b) => a.sequence - b.sequence);
  }

  // --- Attendance (A7 Reporting) ---
  getAttendance() {
    return this.data.attendance;
  }

  saveAttendance(record) {
    const idx = this.data.attendance.findIndex((a) => a.id === record.id);
    if (idx >= 0) {
      this.data.attendance[idx] = { ...this.data.attendance[idx], ...record };
    } else {
      this.data.attendance.unshift({
        ...record,
        id: record.id || `att-${Date.now()}`
      });
    }
    this.save();
  }

  // --- Payruns & Payslips ---
  getPayruns() {
    return this.data.payruns;
  }

  savePayrun(payrun) {
    const idx = this.data.payruns.findIndex((p) => p.id === payrun.id);
    if (idx >= 0) {
      this.data.payruns[idx] = { ...this.data.payruns[idx], ...payrun };
    } else {
      this.data.payruns.unshift({
        ...payrun,
        id: payrun.id || `pr-${Date.now()}`
      });
    }
    this.save();
  }
}

export const store = new DataStore();
export default store;
