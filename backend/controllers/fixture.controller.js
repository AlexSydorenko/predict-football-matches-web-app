import { formatFixtureData, filterAndFormatFixturesData } from "../utils/filterAndFormatFixturesData.js";

export const getFixtureById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await fetch(`${process.env.SPORTMONKS_BASE_URL}/fixtures/${id}?
            include=scores;league;participants&api_token=${process.env.SPORTMONKS_API_KEY}`);

        const data = await result.json();
        const fixture = data.data;

        const formattedFixture = formatFixtureData(fixture);

        res.status(200).json(formattedFixture);

    } catch (error) {
        console.log('Error in getFixtureById controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getFixturesByDate = async (req, res) => {
    try {
        const { date } = req.params;

        const result = await fetch(`${process.env.SPORTMONKS_BASE_URL}/fixtures/date/${date}?
            include=scores;league;participants&api_token=${process.env.SPORTMONKS_API_KEY}`);

        const data = await result.json();
        const fixtures = data.data;

        let formattedFixtures = [];
        if (fixtures && fixtures.length !== 0) {
            formattedFixtures = filterAndFormatFixturesData(fixtures);
        }

        if (formattedFixtures.length === 0) {
            return res.status(404).json({ error: `No matches on this date. Check another one.` });
        }

        res.status(200).json(formattedFixtures);

    } catch (error) {
        console.log('Error in getFixturesByDate controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}
