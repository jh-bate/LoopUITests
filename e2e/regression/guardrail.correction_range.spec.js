const { LoopTest, screenName, target } = require('../../src/index');

describe.skip('guard rail correction range', () => {
    var loopTest;
    it('should setup with correct configuration', async () => {
        loopTest = await new LoopTest.Builder(target.tidepool)
            .withSettings({ AddPumpSimulator: true })
            .withStartScreen(screenName.settings)
            .build();
    });

    // TODO: once CorrectionRanges uses accessibile pickers we should
    // be able to launch loop once and then reuse the setup
    it('maximum 180 can be set, warning', async () => {
        await loopTest.settingsScreen.SetCorrectionRanges([{ time: '12:00 AM', min: '179', max: '180' }]);
        //TODO assert on warning
    });
    it('maximum 121 can be set, warning', async () => {
        await loopTest.settingsScreen.SetCorrectionRanges([{ time: '12:30 AM', min: '120', max: '121' }]);
        //TODO assert on warning
    });
    it('maximum 120 can be set, no warning', async () => {
        await loopTest.settingsScreen.SetCorrectionRanges([{ time: '1:00 AM', min: '119', max: '120' }]);
    });
    it('minimum 70 can be set, no warning', async () => {
        await loopTest.settingsScreen.SetCorrectionRanges([{ time: '1:30 AM', min: '70', max: '180' }]);
    });
    it('minimum 69 can be set, warning', async () => {
        await loopTest.settingsScreen.SetCorrectionRanges([{ time: '2:00 AM', min: '69', max: '180' }]);
        //TODO assert on warning
    });
    it('minimum 60 can be set, warning', async () => {
        await loopTest.settingsScreen.SetCorrectionRanges([{ time: '2:30 AM', min: '60', max: '180' }]);
        //TODO assert on warning
    });
    it('minimum 59 cannot be set', async () => {
        try {
            await loopTest.settingsScreen.SetCorrectionRanges([{ time: '12:00 AM', min: '59', max: '180' }]);
        } catch (error) {
            //errors as cannot set to 59
        }
    });
    it('maximum 181 cannot be set', async () => {
        try {
            await loopTest.settingsScreen.SetCorrectionRanges([{ time: '12:00 AM', min: '180', max: '181' }]);
        } catch (error) {
            //errors as cannot set to 181
        }
    });
});
