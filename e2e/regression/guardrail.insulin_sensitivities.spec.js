const { LoopTest, screenName, target } = require('../../src/index');

describe('guardrail insulin sensitivities', () => {
    var loopTest;
    it('should setup with pump simulator', async () => {
        loopTest = await new LoopTest.Builder(target.tidepool)
            .withSettings({ AddPumpSimulator: true })
            .withStartScreen(screenName.settings)
            .build();
    });

    it('set 500 units, warning', async () => {
        await loopTest.settingsScreen.SetInsulinSensitivities([{ time: '12:00 AM', bgValuePerInsulinUnit: '500' }]);
        //TODO assert on warning
    });
    it('set 400 units, warning', async () => {
        await loopTest.settingsScreen.SetInsulinSensitivities([{ time: '12:30 AM', bgValuePerInsulinUnit: '400' }]);
        //TODO assert on warning
    });
    it('set 15 units, warning', async () => {
        await loopTest.settingsScreen.SetInsulinSensitivities([{ time: '1:00 AM', bgValuePerInsulinUnit: '15' }]);
        //TODO assert on warning
    });
    it('set 10 units, warning', async () => {
        await loopTest.settingsScreen.SetInsulinSensitivities([{ time: '1:30 AM', bgValuePerInsulinUnit: '10' }]);
        //TODO assert on warning
    });
    it('cannot set 9 units', async () => {
        try {
            await loopTest.settingsScreen.SetInsulinSensitivities([{ time: '2:00 PM', bgValuePerInsulinUnit: '9' }]);
        } catch (error) {
            //TODO assert cannot be set
        }
    });
    it('cannot set 501 units', async () => {
        try {
            await loopTest.settingsScreen.SetInsulinSensitivities([{ time: '2:30 PM', bgValuePerInsulinUnit: '501' }]);
        } catch (error) {
            //TODO assert cannot be set
        }
    });
});

