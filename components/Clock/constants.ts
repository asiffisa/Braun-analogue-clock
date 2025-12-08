export const CLOCK_DIMENSIONS = {
    size: 400,
    radius: 178, // Position elements near the edge (radius 184px out of 200px approx)
};

export const CLOCK_THEME = {
    colors: {
        bg: '#FAFAFA',
        border: 'white',
        ticks: '#D4D4D5',
        numbers: 'black',
        hands: {
            hour: 'black',
            minute: 'black',
            second: '#F5A623',
            secondShadow: 'rgba(0,0,0,0.2)',
            centerCap: '#F5A623',
            centerCapInset: 'rgba(255, 229, 156, 1)',
            insert: 'white', // White slot/insert detail on hands
        },
        shadows: {
            clock: '0 10px 30px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
            hand: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow-lg equivalent
        }
    },
};
