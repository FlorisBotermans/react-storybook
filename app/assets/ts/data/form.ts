const data = {
  intro: 'Dit is een introductie van een formulier.',
  remark: '',
  steps: [
    {
      name: 'formulier',
      parts: [
        {
          value: '',
          part: 'field',
          type: 'text',
          visibility: null,
          name: 'TextInput',
          label: 'Text input',
          placeholder: 'Placeholder',
          hint: 'Dit is een uitleg.',
          readOnly: false,
          validation: {
            type: 'string',
            rules: [
              {
                params: [''],
                type: 'typeError',
                error: 'De ingevoerde waarde is niet geldig.'
              },
              {
                params: [],
                type: 'required',
                error: 'Dit is een verplicht veld.'
              },
              {
                params: [500],
                type: 'max',
                error: 'Het maximale aantal karakters is 500'
              }
            ]
          }
        },
        {
          value: '',
          part: 'field',
          type: 'text',
          visibility: null,
          name: 'Email',
          label: 'E-mail',
          placeholder: 'naam@hku.nl',
          hint: 'Dit is een uitleg.',
          readOnly: false,
          validation: {
            type: 'string',
            rules: [
              {
                type: 'email',
                error: 'Dit is geen geldig e-mailadres.'
              },
              {
                params: [],
                type: 'required',
                error: 'Dit is een verplicht veld.'
              },
              {
                params: [500],
                type: 'max',
                error: 'Het maximale aantal karakters is 500'
              }
            ]
          }
        },
        {
          value: '',
          part: 'field',
          type: 'phone',
          visibility: null,
          name: 'Phone',
          label: 'Telefoon',
          placeholder: 'Placeholder',
          hint: 'Dit is een uitleg.',
          readOnly: false,
          validation: {
            type: 'string',
            rules: [
              {
                params: [''],
                type: 'typeError',
                error: 'De ingevoerde waarde is niet geldig.'
              },
              {
                params: [],
                type: 'required',
                error: 'Dit is een verplicht veld.'
              },
              {
                params: [500],
                type: 'max',
                error: 'Het maximale aantal karakters is 500'
              }
            ]
          }
        },
        {
          value: [],
          direction: 'vertical',
          options: [
            {
              label: 'Optie 1',
              value: 'Optie 1'
            },
            {
              label: 'Optie 2',
              value: 'Optie 2'
            },
            {
              label: 'Optie 3',
              value: 'Optie 3'
            }
          ],
          part: 'field',
          type: 'checkboxGroup',
          visibility: null,
          name: 'BizForm.CheckboxGroup',
          label: 'Checkbox (groep)',
          hint: 'Dit is de uitleg.',
          readOnly: false,
          validation: {
            type: 'array',
            rules: [
              {
                params: [''],
                type: 'typeError',
                error: 'TL.Form.TypeError.Array'
              }
            ]
          }
        },
        {
          labelHidden: true,
          value: false,
          part: 'field',
          type: 'checkbox',
          visibility: null,
          name: 'CheckBox',
          label: 'Checkbox',
          placeholder: '',
          hint: 'Dit is de uitleg.',
          tooltip: 'Dit is de tooltip.',
          readOnly: false,
          validation: null
        },
        {
          value: '',
          direction: 'vertical',
          options: [
            {
              label: 'Optie 1',
              value: 'Optie 1'
            },
            {
              label: 'Optie 2',
              value: 'Optie 2'
            }
          ],
          part: 'field',
          type: 'radioGroup',
          name: 'RadioButtons',
          label: 'Radio buttons',
          placeholder: '',
          hint: 'Dit is de uitleg.',
          validation: {
            type: 'string',
            rules: [
              {
                params: [''],
                type: 'typeError',
                error: 'De ingevoerde waarde is niet geldig.'
              }
            ]
          }
        },
        {
          part: 'field',
          type: 'select',
          name: 'Bizform.select',
          label: 'Dropdown (single)',
          placeholder: 'Maak een keuze',
          value: '1',
          disabled: false,
          options: [{
            label: 'Keuze 1',
            value: '1'
          },
          {
            label: 'Keuze 2',
            value: '2'
          },
          {
            label: 'Keuze 3',
            value: '3'
          }
          ],
          isMulti: false,
          noOptionsMessage: 'Geen opties gevonden. Probeer een andere zoekterm.',
          validation: {
            type: 'string',
            rules: [{
              type: 'required',
              error: 'Dit is een verplicht veld.'
            }]
          }
        },
        {
          part: 'field',
          type: 'select',
          name: 'Bizform.SelectMultiple',
          label: 'Dropdown (multiple)',
          placeholder: 'Maak een keuze',
          value: [],
          disabled: false,
          options: [{
            label: 'Keuze 1',
            value: '1'
          },
          {
            label: 'Keuze 2',
            value: '2'
          },
          {
            label: 'Keuze 3',
            value: '3'
          }
          ],
          isMulti: true,
          noOptionsMessage: 'Geen opties gevonden. Probeer een andere zoekterm.',
          validation: {
            type: 'string',
            rules: [{
              type: 'required',
              error: 'Dit is een verplicht veld.'
            }]
          }
        },
        {
          value: '',
          part: 'field',
          type: 'TextArea',
          visibility: null,
          name: 'Textarea',
          label: 'Tekstvlak',
          placeholder: 'Placeholder',
          hint: 'Dit is een uitleg.',
          readOnly: false,
          validation: {
            type: 'string',
            rules: [
              {
                params: [],
                type: 'required',
                error: 'Dit is een verplicht veld.'
              }
            ]
          }
        },
        {
          value: '',
          part: 'field',
          type: 'Date',
          visibility: null,
          name: 'Date',
          label: 'Datumprikker',
          placeholder: 'Placeholder',
          hint: 'Dit is een uitleg.',
          readOnly: false,
          locale: 'nl-NL',
          displayFormat: 'DD-MM-YYYY'
        },
        {
          value: '',
          extensions: [
            'pdf',
            'doc',
            'docx',
            'ppt',
            'pptx',
            'xls',
            'xlsx',
            'htm',
            'html',
            'xml',
            'bmp',
            'gif',
            'jpg',
            'jpeg',
            'png',
            'wav',
            'wma',
            'wmv',
            'mp3',
            'mp4',
            'mpg',
            'mpeg',
            'mov',
            'avi',
            'swf',
            'rar',
            'zip',
            'txt',
            'rtf',
            'webm',
            'ogg',
            'wav',
            'ogv',
            'oga',
            'svg'
          ],
          part: 'field',
          type: 'file',
          visibility: null,
          name: 'FileUploader',
          label: 'File uploader',
          placeholder: 'Kies bestand',
          filledplaceholder: 'Verwijder',
          hint: 'Dit is de uitleg.',
          tooltip: 'Dit is de tooltip.',
          readOnly: false,
          validation: {
            type: 'string',
            rules: [
              {
                params: [''],
                type: 'typeError',
                error: 'De ingevoerde waarde is niet geldig.'
              },
              {
                params: [10 * 1024],
                type: 'maxsize',
                error: 'Het gekozen bestand is te groot. De maximumgrootte is: 10 KB'
              },
              {
                params: [
                  '(.pdf|.doc|.docx|.ppt|.pptx|.xls|.xlsx|.htm|.html|.xml|.bmp|.gif|.jpg|.jpeg|.png|.wav|.wma|.wmv|.mp3|.mp4|.mpg|.mpeg|.mov|.avi|.swf|.rar|.zip|.txt|.rtf|.webm|.ogg|.wav|.ogv|.oga|.svg)$'
                ],
                type: 'matches',
                error:
                                    'De volgende bestanden worden geaccepteerd:: .pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx, .htm, .html, .xml, .bmp, .gif, .jpg, .jpeg, .png, .wav, .wma, .wmv, .mp3, .mp4, .mpg, .mpeg, .mov, .avi, .swf, .rar, .zip, .txt, .rtf, .webm, .ogg, .wav, .ogv, .oga, .svg'
              }
            ]
          }
        }
      ]
    }
  ],
  submit: {
    label: 'Verzenden',
    action: '/',
    method: 'POST',
    async: false,
    errorMessage: 'Tijdens het versturen van het formulier is iets misgegaan. Probeer het later opnieuw.'
  },
  validation: {
    errorMessage: 'Verbeter of vul deze velden in:'
  }
};

export default data;