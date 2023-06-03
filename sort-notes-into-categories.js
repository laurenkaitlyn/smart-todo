//simple check looking for keywords

const simpleCheck = (note) => {
  //change all inputs to lowe case
  const lowerCaseNotes = note.toLowerCase();

  //default to unsorted category
  let category = 5;

  if (
    lowerCaseNotes.includes('watch') ||
    lowerCaseNotes.includes('movie') ||
    lowerCaseNotes.includes('tv') ||
    lowerCaseNotes.includes('show') ||
    lowerCaseNotes.includes('film')
    ) {
      category = 1;
    }
    else if (
      lowerCaseNotes.includes('buy') ||
      lowerCaseNotes.includes('purchase') ||
      lowerCaseNotes.includes('get')
    ) {
      category = 2;
    }
    else if (
      lowerCaseNotes.includes('read') ||
      lowerCaseNotes.includes('book') ||
      lowerCaseNotes.includes('novel')
    ) {
      category = 3;
    }
    else if (
      lowerCaseNotes.includes('eat') ||
      lowerCaseNotes.includes('try') ||
      lowerCaseNotes.includes('food') ||
      lowerCaseNotes.includes('recipe') ||
      lowerCaseNotes.includes('restaurant') ||
      lowerCaseNotes.includes('cafe')
    ) {
      category = 4;
    }

    return category;
};

module.exports = { simpleCheck }
