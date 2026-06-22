/**
 * KNOWN_FIELDS.ts
 *
 * Single source of truth for every canonical field the backend understands.
 * Sourced from:
 *   - normalizeFormDataWithTemplate() output keys
 *   - LifeJourneyReportOrder schema
 *   - normalizeLifeJourneyForm() legacy aliases
 *
 * When you add a new backend field, add it here — the form builder
 * will automatically suggest it in the key picker.
 */

export type FieldType =
  | 'text' | 'email' | 'tel' | 'date' | 'time'
  | 'select' | 'checkbox' | 'textarea' | 'location'
  | 'pincode' | 'gender' | 'language';

export interface KnownField {
  // The key used in the form (what gets submitted)
  key: string;

  // The backend key this maps to (mapTo value). Same as key if no alias needed.
  mapTo: string;

  // Suggested label shown to the user
  label: string;

  // Suggested placeholder
  placeholder: string;

  // Suggested field type
  type: FieldType;

  // Whether this field is typically required
  required: boolean;

  // Whether this is a hidden system field (sent but not shown)
  hidden?: boolean;

  // Grid columns suggestion
  gridCols: 1 | 2;

  // Category for grouping in the picker UI
  category: 'personal' | 'birth' | 'partner' | 'consultation' | 'system' | 'report';

  // Short description shown in the picker
  description: string;

  // If this field auto-fills other fields (e.g. location fills lat/lng)
  fills?: { latKey: string; lngKey: string };

  // Suggested validation rules
  validation?: { type: string; value?: number | string; message: string }[];

  // Default value
  defaultValue?: string;
}

export const KNOWN_FIELDS: KnownField[] = [
  // ─── Personal info ──────────────────────────────────────────────────────────
  {
    key: 'name',
    mapTo: 'name',
    label: 'Name',
    placeholder: 'Enter your full name',
    type: 'text',
    required: true,
    gridCols: 1,
    category: 'personal',
    description: 'Full name of the person ordering the report',
    validation: [
      { type: 'minLength', value: 2, message: 'Name must be at least 2 characters.' },
      { type: 'regex', value: '^[a-zA-Z\\s]+$', message: 'Name can only contain letters and spaces.' },
    ],
  },
  {
    key: 'email',
    mapTo: 'email',
    label: 'Email',
    placeholder: 'Enter your email address',
    type: 'email',
    required: true,
    gridCols: 1,
    category: 'personal',
    description: 'Email for report delivery and order confirmation',
    validation: [{ type: 'email', message: 'Please enter a valid email address.' }],
  },
  {
    key: 'whatsapp',
    mapTo: 'whatsapp',
    label: 'WhatsApp Number',
    placeholder: 'Enter your WhatsApp number',
    type: 'tel',
    required: true,
    gridCols: 1,
    category: 'personal',
    description: 'WhatsApp number for report delivery and updates',
    validation: [{ type: 'minLength', value: 10, message: 'Please enter a valid WhatsApp number.' }],
  },
  {
    key: 'gender',
    mapTo: 'gender',
    label: 'Gender',
    placeholder: '',
    type: 'gender',
    required: true,
    gridCols: 1,
    category: 'personal',
    description: 'Gender — male / female dropdown',
    validation: [{ type: 'required', message: 'Please select a gender.' }],
  },
  {
    key: 'reportLanguage',
    mapTo: 'reportLanguage',
    label: 'Report Language',
    placeholder: '',
    type: 'language',
    required: true,
    gridCols: 1,
    category: 'personal',
    description: 'Language the report will be written in',
    defaultValue: 'english',
  },

  // ─── Birth details ───────────────────────────────────────────────────────────
  {
    key: 'dob',
    mapTo: 'dateOfBirth',
    label: 'Date of Birth',
    placeholder: '',
    type: 'date',
    required: true,
    gridCols: 1,
    category: 'birth',
    description: 'Date of birth — maps to dateOfBirth on backend',
    validation: [{ type: 'required', message: 'Please enter your date of birth.' }],
  },
  {
    key: 'tob',
    mapTo: 'timeOfBirth',
    label: 'Time of Birth',
    placeholder: '',
    type: 'time',
    required: false,
    gridCols: 1,
    category: 'birth',
    description: 'Time of birth — maps to timeOfBirth on backend',
  },
  {
    key: 'pob',
    mapTo: 'placeOfBirth',
    label: 'Place of Birth',
    placeholder: 'Search your birth city (e.g. Delhi, India)',
    type: 'location',
    required: true,
    gridCols: 2,
    category: 'birth',
    description: 'Google Places autocomplete — auto-fills birthLatitude & birthLongitude',
    fills: { latKey: 'birthLatitude', lngKey: 'birthLongitude' },
    validation: [{ type: 'minLength', value: 2, message: 'Place of birth is required.' }],
  },
  {
    key: 'pinCode',
    mapTo: 'placeOfBirthPincode',
    label: 'Birth Place Pin Code',
    placeholder: 'e.g. 110001',
    type: 'pincode',
    required: true,
    gridCols: 1,
    category: 'birth',
    description: 'Pin code of the birth city',
    validation: [{ type: 'minLength', value: 6, message: 'Please enter a valid pin code.' }],
  },
  {
    key: 'birthLatitude',
    mapTo: 'birthLatitude',
    label: '',
    placeholder: '',
    type: 'text',
    required: false,
    hidden: true,
    gridCols: 1,
    category: 'birth',
    description: 'Auto-filled by the Place of Birth location picker — hidden field',
    validation: [{ type: 'required', message: 'Please select a valid location from the dropdown.' }],
  },
  {
    key: 'birthLongitude',
    mapTo: 'birthLongitude',
    label: '',
    placeholder: '',
    type: 'text',
    required: false,
    hidden: true,
    gridCols: 1,
    category: 'birth',
    description: 'Auto-filled by the Place of Birth location picker — hidden field',
    validation: [{ type: 'required', message: 'Please select a valid location from the dropdown.' }],
  },

  // ─── Partner details ─────────────────────────────────────────────────────────
  {
    key: 'partnerDob',
    mapTo: 'partnerDateOfBirth',
    label: "Partner's Date of Birth",
    placeholder: '',
    type: 'date',
    required: true,
    gridCols: 1,
    category: 'partner',
    description: "Partner's DOB — maps to partnerDateOfBirth",
    validation: [{ type: 'required', message: "Partner's date of birth is required." }],
  },
  {
    key: 'partnerTob',
    mapTo: 'partnerTimeOfBirth',
    label: "Partner's Time of Birth",
    placeholder: '',
    type: 'time',
    required: false,
    gridCols: 1,
    category: 'partner',
    description: "Partner's time of birth",
  },
  {
    key: 'partnerPob',
    mapTo: 'partnerPlaceOfBirth',
    label: "Partner's Place of Birth",
    placeholder: 'City, State, Country',
    type: 'location',
    required: false,
    gridCols: 2,
    category: 'partner',
    description: "Partner's birth city — auto-fills partnerBirthLatitude & partnerBirthLongitude",
    fills: { latKey: 'partnerBirthLatitude', lngKey: 'partnerBirthLongitude' },
  },
  {
    key: 'partnerGender',
    mapTo: 'partnerGender',
    label: "Partner's Gender",
    placeholder: '',
    type: 'gender',
    required: false,
    gridCols: 1,
    category: 'partner',
    description: "Partner's gender",
  },
  {
    key: 'partnerBirthLatitude',
    mapTo: 'partnerBirthLatitude',
    label: '',
    placeholder: '',
    type: 'text',
    required: false,
    hidden: true,
    gridCols: 1,
    category: 'partner',
    description: 'Auto-filled by partner location picker — hidden field',
  },
  {
    key: 'partnerBirthLongitude',
    mapTo: 'partnerBirthLongitude',
    label: '',
    placeholder: '',
    type: 'text',
    required: false,
    hidden: true,
    gridCols: 1,
    category: 'partner',
    description: 'Auto-filled by partner location picker — hidden field',
  },

  // ─── Consultation / ask-astrologer ───────────────────────────────────────────
  {
    key: 'problemType',
    mapTo: 'problemType',
    label: 'Problem Type',
    placeholder: '',
    type: 'select',
    required: true,
    gridCols: 2,
    category: 'consultation',
    description: 'Type of problem for consultation — career, health, finance, couple, other',
    validation: [{ type: 'required', message: 'Please select a problem type.' }],
  },
  {
    key: 'questionOne',
    mapTo: 'questionOne',
    label: 'Question One',
    placeholder: 'Enter your first question for the astrologer',
    type: 'textarea',
    required: true,
    gridCols: 2,
    category: 'consultation',
    description: 'First question for ask-astrologer plans',
    validation: [{ type: 'required', message: 'Please enter your first question.' }],
  },
  {
    key: 'questionTwo',
    mapTo: 'questionTwo',
    label: 'Question Two',
    placeholder: 'Enter your second question for the astrologer',
    type: 'textarea',
    required: true,
    gridCols: 2,
    category: 'consultation',
    description: 'Second question for ask-astrologer plans',
    validation: [{ type: 'required', message: 'Please enter your second question.' }],
  },

  // ─── System / hidden fields ──────────────────────────────────────────────────
  {
    key: 'source',
    mapTo: 'source',
    label: '',
    placeholder: '',
    type: 'text',
    required: false,
    hidden: true,
    gridCols: 1,
    defaultValue: 'simple',
    category: 'system',
    description: 'Traffic source tracking — hidden, defaults to "simple"',
  },
];

export const KNOWN_FIELD_KEYS = KNOWN_FIELDS.map(f => f.key);

export const CATEGORY_LABELS: Record<KnownField['category'], string> = {
  personal:     'Personal info',
  birth:        'Birth details',
  partner:      'Partner details',
  consultation: 'Consultation / questions',
  system:       'System / hidden',
  report:       'Report-specific',
};

/** Returns all keys already used in a flat list of field definitions */
export function getUsedKeys(sections: { fields: { key: string }[] }[]): Set<string> {
  const keys = new Set<string>();
  sections.forEach(s => s.fields.forEach(f => { if (f.key) keys.add(f.key); }));
  return keys;
}