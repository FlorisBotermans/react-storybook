const data = {
  accent: 1,
  resultsTotalText: 'resultaten',
  action: '/app/ajax/search-results.json',
  submitErrorMessage: 'Tijdens het versturen van het formulier is iets misgegaan. Probeer het later opnieuw.',
  fields: [
    {
      type: 'searchtext',
      placeholder: 'Zoeken',
      label: 'Zoeken',
      name: 'text',
      value: '',
      buttonText: 'Zoeken',
      typeErrorMessage: 'De ingevoerde waarde is niet geldig.',
      requiredErrorMessage: 'Dit veld is verplicht'
    }
    /* {
          type: 'select',
          placeholder: 'Type',
          label: 'Type',
          name: 'type',
          value: '',
          noOptionsMessage: 'Geen keuze beschikbaar',
          options: [
            {
              label: 'Opleiding',
              value: 'opleiding'
            },
            {
              label: 'Nieuws',
              value: 'nieuws'
            },
            {
              label: 'Agenda',
              value: 'agenda'
            }
          ]
        }, */
  ],
  title: 'Zoeken',
  noHeader: true,
  actionIsResultsUrl: true,
};

export default data;