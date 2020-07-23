const translateWords = (words, lang) => {
  const wordsList = [
    {'applicants': {en: 'Applicants', de: 'Bewerber'}},
    {'new': {en: 'New', de: 'Neu'}},
    {'viewed': {en: 'Viewed', de: 'Gesehen'}},
    {'appointment': {en: 'Appointment', de: 'Termin'}},
    {'others': {en: 'Others', de: 'Andere'}},
    {'languages': {en: 'Languages', de: 'Sprachen'}},
    {'appointment_set': {en: 'Appointment Set', de: 'Terminsatz'}},
    {'property_viewed': {en: 'Property Viewed', de: 'Eigenschaft angezeigt'}},
    {'interested': {en: 'Interested', de: 'Interessiert'}},
    {'offer_accepted': {en: 'Offer Accepted', de: 'Angebot angenommen'}},
  ]
  const findWord = wordsList.find(word => word[words.toLowerCase()])
  return findWord[words.toLowerCase()][lang]
}



export default translateWords;