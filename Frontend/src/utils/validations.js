import { ACCEPTED_ATTACHMENT_TYPES, MAX_FILE_SIZE } from "../constants";
import { z } from "zod";

export function validateRegistrationForm(formValue) {
  const errors = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeCheck: "",
  };

  if (!formValue.name) {
    errors.name = "Name is required";
  } else if (!/^[A-Za-z\s]+$/.test(formValue.name)) {
    errors.name = "Name must not contain numbers or special characters";
  }

  if (!formValue.email) {
    errors.email = "Email is required";
  } else if (!isValidEmail(formValue.email)) {
    errors.email = "Invalid email format";
  }

  if (!formValue.password) {
    errors.password = "Password is required";
  } else if (formValue.password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(formValue.password)) {
    errors.password = "Password must be alphanumeric (letters and numbers)";
  }

  if (!formValue.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (formValue.confirmPassword !== formValue.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!formValue.agreeCheck) {
    errors.agreeCheck = "You must agree to the Terms and Conditions";
  }

  return errors;
}

export function validateLoginForm(formValue) {
  const errors = {
    email: "",
    password: "",
  };

  if (!formValue.email) {
    errors.email = "Email is required";
  } else if (!isValidEmail(formValue.email)) {
    errors.email = "Invalid email format";
  }

  if (!formValue.password) {
    errors.password = "Password is required";
  }

  return errors;
}

export function validateResetPassword(password) {
  const errors = {
    password: "",
  };

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(password)) {
    errors.password = "Password must be alphanumeric (letters and numbers)";
  }

  return errors;
}

function isValidEmail(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

export const eventValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  venue: z.string().min(1, { message: "Venue is required" }),
  leader: z.string().min(1, { message: "Leader is required" }),
  budget: z
    .number({
      required_error: "Budget is required",
      invalid_type_error: "Invalid Input",
    })
    .int()
    .positive(),
  spent: z
    .number({
      required_error: "Spent amount is required",
      invalid_type_error: "Invalid Input",
    })
    .int()
    .positive(),
  duration: z
    .number({
      required_error: "Duration is required",
      invalid_type_error: "Invalid Input",
    })
    .int()
    .positive(),
  description: z.string(),
  date: z.string().min(1, { message: "Date is required" }),
  time: z.string().min(1, { message: "Time is required" }),
});

export async function validateFiles(files, setError) {
  for (const file of files) {
    if (!ACCEPTED_ATTACHMENT_TYPES.includes(file.type)) {
      setError("attachment", {
        key: "attachment",
        message: `File ${file.name} has an invalid file type.`,
      });
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("attachment", {
        key: "attachment",
        message: `File ${file.name} exceeds the maximum file size of 5MB.`,
      });
      return false;
    }
  }

  return true;
}

const isNumericString = (str) => /^[0-9]+$/.test(str);
const isAlphabeticString = (str) => /^[A-Za-z]+$/.test(str);
const containsNoNumbers = (str) => !/\d/.test(str);
const isAlphabeticStringOptional = (str) => {
  return str === "" || /^[A-Za-z]+$/.test(str);
};

export const personalInfoValidation = z.object({
  address: z.string().min(1, { message: "Address is required" }),
  blood: z.string().min(1, { message: "Blood type is required" }),
  city: z.string().min(1, { message: "City is required" }),
  dob: z.date(),
  email: z.string().email().min(1, { message: "Email is required" }),
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .refine((value) => containsNoNumbers(value), {
      message: "Invalid Father Name",
    }),
  gender: z.string().min(1, { message: "Gender is required" }),
  height: z
    .string()
    .min(1, { message: "Height is required" })
    .refine(isNumericString, {
      message: "Height must contain only numeric characters",
    }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .refine((value) => containsNoNumbers(value), {
      message: "Invalid Father Name",
    }),
  maritalStatus: z.string().min(1, { message: "Marital status is required" }),
  medicalCondition: z.string(),
  nationality: z.string().min(1, { message: "Nationality is required" }),
  phone: z
    .string()
    .min(1, { message: "Phone is required" })
    .refine(isNumericString, {
      message: "Phone must contain only numeric characters",
    }),
  province: z.string().min(1, { message: "Province is required" }),
  religion: z.string().min(1, { message: "Religion is required" }),
  weight: z
    .string()
    .min(1, { message: "Weight is required" })
    .refine(isNumericString, {
      message: "Weight must contain only numeric characters",
    }),
  zip: z
    .string()
    .min(1, { message: "ZIP code is required" })
    .refine(isNumericString, {
      message: "ZIP code must contain only numeric characters",
    }),
  emergencyContact: z
    .string()
    .min(1, { message: "Emergency contact is required" })
    .refine(isNumericString, {
      message: "Emergency contact must contain only numeric characters",
    }),
});

export const familyInfoValidation = z.object({
  fatherName: z
    .string()
    .min(1, { message: "Father name is required" })
    .optional()
    .or(z.literal(""))
    .refine((value) => containsNoNumbers(value), {
      message: "Invalid Father Name",
    }),
  motherName: z
    .string()
    .min(1, { message: "Mother name is required" })
    .optional()
    .or(z.literal(""))
    .refine((value) => containsNoNumbers(value), {
      message: "Invalid Mother Name",
    }),
  spouseName: z.string().refine((value) => containsNoNumbers(value), {
    message: "Invalid Spouse Name",
  }),
  dependents: z
    .string()
    .min(1, { message: "Dependents is required" })
    .optional()
    .or(z.literal(""))
    .refine(
      (value) => {
        if (value === null) {
          return true;
        }
        const numericValue = Number(value);
        return !isNaN(numericValue) && isFinite(numericValue);
      },
      {
        message: "Dependents must be a number",
      }
    ),
  siblings: z.string(),
  familyContact: z
    .string()
    .min(1, { message: "Contact is required" })
    .optional()
    .or(z.literal(""))
    .refine(
      (value) => {
        if (value === null) {
          return true;
        }
        const numericValue = Number(value);
        return !isNaN(numericValue) && isFinite(numericValue);
      },
      {
        message: "Contact must contain only numbers",
      }
    ),
});

export const educationInfoValidation = z.object({
  educationLevel: z
    .string()
    .min(1, { message: "Education level is required" })
    .optional()
    .or(z.literal("")),
  institute: z
    .string()
    .min(1, { message: "Institute name is required" })
    .optional()
    .or(z.literal("")),
  major: z
    .string()
    .min(1, { message: "Major is required" })
    .optional()
    .or(z.literal("")),
  graduationYear: z
    .string()
    .min(4, { message: "Invalid Date" })
    .optional()
    .or(z.literal(""))
    .refine(
      (value) => {
        if (value === null) {
          return true;
        }
        const numericValue = Number(value);
        return !isNaN(numericValue) && isFinite(numericValue);
      },
      {
        message: "Invalid Date",
      }
    ),
  certificates: z.string(),
  gpa: z.string(),
  awards: z.string(),
});

export const professionalInfoValidation = z.object({
  jobTitle: z
    .string()
    .min(1, { message: "Job Title is required" })
    .optional()
    .or(z.literal("")),
  industry: z
    .string()
    .min(1, { message: "Industry name is required" })
    .optional()
    .or(z.literal("")),
  responsibilities: z
    .string()
    .min(1, { message: "Job Responsibilites is required" })
    .optional()
    .or(z.literal("")),
  skills: z
    .string()
    .min(1, { message: "Skills are required" })
    .optional()
    .or(z.literal("")),
  references: z
    .string()
    .min(1, { message: "Reference are required" })
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .min(1, { message: "Organization Name is required" })
    .optional()
    .or(z.literal("")),
  licenses: z
    .string()
    .min(1, { message: "Licenses is required" })
    .optional()
    .or(z.literal("")),
  positions: z
    .string()
    .min(1, { message: "Organization Name is required" })
    .optional()
    .or(z.literal("")),
  workHistory: z
    .string()
    .min(1, { message: "Work History is required" })
    .optional()
    .or(z.literal("")),
  workExperience: z
    .string()
    .min(1, { message: "Work Experience is required" })
    .optional()
    .or(z.literal(""))
    .refine(
      (value) => {
        if (value === null) {
          return true;
        }
        const numericValue = Number(value);
        return !isNaN(numericValue) && isFinite(numericValue);
      },
      {
        message: "Experience must be no of years",
      }
    ),
});

export const otherInfoValidation = z.object({
  interests: z
    .string()
    .min(1, { message: "Interests is required" })
    .optional()
    .or(z.literal("")),
  languages: z
    .string()
    .min(1, { message: "Spoken Languages name is required" })
    .optional()
    .or(z.literal("")),
  socialMediaProfiles: z
    .string()
    .min(1, { message: "Social Media Profiles is required" })
    .optional()
    .or(z.literal("")),
  volunteerWork: z
    .string()
    .min(1, { message: "Volunteer Work are required" })
    .optional()
    .or(z.literal("")),
  militaryServices: z.string(),
  role: z.string().min(1, { message: "Role is required" }),
});

export const donationValidationSchema = z.object({
  projectName: z.string().min(1, { message: "Project Name is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  requiredCost: z
    .number({
      required_error: "Required Cost is required",
      invalid_type_error: "Invalid Input",
    })
    .int()
    .positive(),
  city: z.string(),
});
