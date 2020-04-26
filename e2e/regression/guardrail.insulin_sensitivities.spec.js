const { Test, screenName, limits } = require('../../src/index');

describe('guardrail insulin sensitivities', () => {
    var test;
    it('should setup with pump simulator', async () => {
        test = new Test()
            .withSettings({ AddPumpSimulator: true })
            .withStartScreen(screenName.settings);
        await test.prepare();
    });

    it('can set maximum units with warning', async () => {
        await test.settingsScreen.SetInsulinSensitivities(
            [{ time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.max.maximum }],
            { fromSettings: true, toSettings: false }
        );
        //TODO assert on warning
    });
    it('can set maximum warning units', async () => {
        await test.settingsScreen.SetInsulinSensitivities(
            [{ time: '12:30 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.max.lowerBoundary }],
            { fromSettings: false, toSettings: false }
        );
        //TODO assert on warning
    });
    it('can set below maximum lower boundary units with no warning', async () => {
        await test.settingsScreen.SetInsulinSensitivities(
            [{ time: '1:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.max.lowerBoundary - limits.insulinSensitivities.unitIncrement }],
            { fromSettings: false, toSettings: false }
        );
        //TODO assert NO warning
    });
    it('can set at above upper boundary minimum with no warning', async () => {
        await test.settingsScreen.SetInsulinSensitivities(
            [{ time: '1:30 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.min.upperBoundary + limits.insulinSensitivities.unitIncrement }],
            { fromSettings: false, toSettings: false }
        );
        //TODO assert NO warning
    });
    it('can set at upper boundary minimum units with warning', async () => {
        await test.settingsScreen.SetInsulinSensitivities(
            [{ time: '2:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.min.upperBoundary }],
            { fromSettings: false, toSettings: false }
        );
        //TODO assert on warning
    });
    it('can set at minimum units with warning', async () => {
        await test.settingsScreen.SetInsulinSensitivities(
            [{ time: '2:30 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.min.minimum }],
            { fromSettings: false, toSettings: false }
        );
        //TODO assert on warning
    });
    it('cannot set above maximum units', async () => {
        try {
            await test.settingsScreen.SetInsulinSensitivities(
                [{ time: '3:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.max.maximum + limits.insulinSensitivities.unitIncrement }],
                { fromSettings: false, toSettings: false }
            );
        } catch (error) {
            //TODO assert cannot be set
        }
    });
    it('cannot set below the minimum units', async () => {
        try {
            await test.settingsScreen.SetInsulinSensitivities(
                [{ time: '3:30 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.min.minimum - limits.insulinSensitivities.unitIncrement }],
                { fromSettings: false, toSettings: false }
            );
        } catch (error) {
            //TODO assert cannot be set
        }
    });

});

