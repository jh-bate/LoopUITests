const { Test, screenName, limits } = require('../../src/index');

describe.skip('guard rail correction range', () => {
    var test;
    it('should setup with correct configuration', async () => {
        test = new Test()
            .withSettings({ AddPumpSimulator: true })
            .withStartScreen(screenName.settings);
        await test.prepare();
    });

    // TODO: once CorrectionRanges uses accessibile pickers we should
    // be able to launch loop once and then reuse the setup

    it('above maximum cannot be set', async () => {
        try {
            await test.settingsScreen.SetCorrectionRanges([{
                time: '12:00 AM',
                min: limits.correctionRange.max.maximum,
                max: limits.correctionRange.max.maximum + limits.correctionRange.unitIncrement
            }]);
        } catch (error) {
            //errors as cannot set to 181
        }
    });

    it('maximum can be set with warning', async () => {
        await test.settingsScreen.SetCorrectionRanges([{
            time: '12:00 AM',
            min: limits.correctionRange.max.maximum - limits.correctionRange.unitIncrement,
            max: limits.correctionRange.max.maximum
        }]);
        //TODO assert on warning
    });
    it('maximum above lower boundary can be set with warning', async () => {
        await test.settingsScreen.SetCorrectionRanges([{
            time: '12:30 AM',
            min: limits.correctionRange.max.lowerBoundary,
            max: limits.correctionRange.max.lowerBoundary + limits.correctionRange.unitIncrement
        }]);
        //TODO assert on warning
    });
    it('maximum lower boundary can be set, no warning', async () => {
        await test.settingsScreen.SetCorrectionRanges([{
            time: '1:00 AM',
            min: limits.correctionRange.max.lowerBoundary - limits.correctionRange.unitIncrement,
            max: limits.correctionRange.max.lowerBoundary
        }]);
        //TODO assert NO warning
    });
    it('above minimum upper boundary can be set, no warning', async () => {
        await test.settingsScreen.SetCorrectionRanges([{
            time: '1:30 AM',
            min: limits.correctionRange.min.upperBoundary,
            max: limits.correctionRange.max.maximum
        }]);
        //TODO assert NO warning
    });
    it('minimum upper boundary can be set with warning', async () => {
        await test.settingsScreen.SetCorrectionRanges([{
            time: '2:00 AM',
            min: limits.correctionRange.min.upperBoundary - limits.correctionRange.unitIncrement,
            max: limits.correctionRange.max.maximum
        }]);
        //TODO assert on warning
    });
    it('minimum can be set with warning', async () => {
        await test.settingsScreen.SetCorrectionRanges([{
            time: '2:30 AM',
            min: limits.correctionRange.min.minimum,
            max: limits.correctionRange.max.maximum
        }]);
        //TODO assert on warning
    });
    it('below minimum cannot be set', async () => {
        try {
            await test.settingsScreen.SetCorrectionRanges([{
                time: '12:00 AM',
                min: limits.correctionRange.min.minimum - limits.correctionRange.unitIncrement,
                max: limits.correctionRange.max.maximum
            }]);
        } catch (error) {
            //errors as cannot set to 59
        }
    });

});
