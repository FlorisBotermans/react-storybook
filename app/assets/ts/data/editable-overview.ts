const data = {
  url: '/app/ajax/opleidingen/items.json',
  networkErrorMessage: 'De opleidingen konden niet worden bijgewerkt. Controleer je netwerkverbinding en/of herlaad de pagina.',
  emptyMessage: 'Je hebt nog geen opleidingen',
  addText: 'Toevoegen',
  availableOverview: {
    title: 'Opleidingen',
    closeText: 'Sluiten',
    allText: 'Alle opleidingen',
    search: {
      placeholderText: 'Zoeken in opleidingen',
      btnText: 'Zoek opleidingen'
    },
    url: '/app/ajax/opleidingen/available.json',
    networkErrorMessage: 'De beschikbare opleidingen konden niet worden opgehaald. Controleer je netwerkverbinding en/of heropen deze overlay.',
    emptyMessage: 'Er zijn geen beschikbare opleidingen'
  },
  addUrl: '/app/ajax/opleidingen/add.json',
  addNetworkErrorMessage: 'Het toevoegen van de opleiding is mislukt. Controleer je netwerkverbinding en/of heropen deze overlay.',
  deleteUrl: '/app/ajax/opleidingen/delete.json',
  orderUrl: '/app/ajax/opleidingen/order.json'
};

export default data;