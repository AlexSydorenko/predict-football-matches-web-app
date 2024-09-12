import { leagues } from "../data/leagues.js";

export const formatFixtureData = (fixture) => {
    let homeGoals = 0;
    let awayGoals = 0;

    fixture.scores.filter(score => score.description === '2ND_HALF')
        .forEach(scoreItem => {
            const { goals, participant } = scoreItem.score;

            if (participant === 'home') {
                homeGoals = goals;
            } else if (participant === 'away') {
                awayGoals = goals;
            }
        });

    return ({
        id: fixture.id,
        name: fixture.name,
        starting_at: fixture.starting_at,
        score: 
            fixture.scores.length === 0 ? [] : { home: homeGoals, away: awayGoals },
        league: {
            name: fixture.league.name,
            image: fixture.league.image_path,
        },
        participants: [
            {
                name: fixture.participants[0].name,
                image: fixture.participants[0].image_path,
                location: fixture.participants[0].meta.location,
            },
            {
                name: fixture.participants[1].name,
                image: fixture.participants[1].image_path,
                location: fixture.participants[1].meta.location,
            }
        ]
    })
}

export const filterAndFormatFixturesData = (fixtures) => {
    const filteredLeagues = fixtures.filter(fixture => leagues.includes(fixture.league.name));

    return filteredLeagues.map(fixture => formatFixtureData(fixture));
}
