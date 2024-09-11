// Generate the array of letters for each day
const dailyLetters = () => {
    const today = new Date();
    const day = today.getDate(); // Use the date to rotate letters each day
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    
    // Shuffle the array based on the day number
    return letters.sort(() => 0.5 - Math.random()).slice(0, 15); // Adjust the number of letters you want to use
};

// Export the letters for use in the game
const lettersForToday = dailyLetters();
