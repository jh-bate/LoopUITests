const { LoopTest, target } = require('../../src/index');

describe('accessibility', () => {
    var loopTest;
    beforeAll(async () => {
        loopTest = await new LoopTest.Builder(target.tidepool).build();
    });
    describe('home', () => {
        it('has a Active Carbohydrates Label', async () => {
            await expect(loopTest.homeScreen.ActiveCarbohydratesLabel()).toExist();
        });
        it('has a Active Insulin Label', async () => {
            await expect(loopTest.homeScreen.ActiveInsulinLabel()).toExist();
        });
        it('has a Insulin Delivery Label', async () => {
            await expect(loopTest.homeScreen.InsulinDeliveryLabel()).toExist();
        });
        it('has a Glucose Label', async () => {
            await expect(loopTest.homeScreen.GlucoseLabel()).toExist();
        });
        it('has a Settings Button', async () => {
            await expect(loopTest.homeScreen.SettingsButton()).toExist();
        });
        it('has a Add Meal Button', async () => {
            await expect(loopTest.homeScreen.AddMealButton()).toExist();
        });
        it('has a Bolus Button', async () => {
            await expect(loopTest.homeScreen.BolusButton()).toExist();
        });
    });
    describe('bolus', () => {
        beforeAll(async () => {
            await loopTest.bolusScreen.Open();
        });
        afterAll(async () => {
            await loopTest.bolusScreen.Cancel();
        });
        it('has a Bolus Header', async () => {
            await expect(loopTest.bolusScreen.BolusHeader()).toExist();
        });
        it('has a Deliver Button', async () => {
            await expect(loopTest.bolusScreen.DeliverButton()).toExist();
        });
        it('has a Disabled Deliver Button', async () => {
            await expect(loopTest.bolusScreen.DisabledDeliverButton()).toExist();
        });
        it('has a Recommended Label', async () => {
            await expect(loopTest.bolusScreen.RecommendedLabel()).toExist();
        });
        it('has a Entered Label', async () => {
            await expect(loopTest.bolusScreen.EnteredLabel()).toExist();
        });
        it('has a Cancel Header Button', async () => {
            await expect(loopTest.bolusScreen.CancelHeaderButton()).toExist();
        });
    });
    describe('add meal', () => {
        beforeAll(async () => {
            await loopTest.carbEntryScreen.Open();
        });
        afterAll(async () => {
            await loopTest.carbEntryScreen.Cancel();
        });
        it('has a Add Carb Entry Header', async () => {
            await expect(loopTest.carbEntryScreen.AddCarbEntryHeader()).toExist();
        });
        it('has a Cancel Header Button', async () => {
            await expect(loopTest.carbEntryScreen.CancelHeaderButton()).toExist();
        });
        it('has a Disabled Continue Main Button', async () => {
            await expect(loopTest.carbEntryScreen.DisabledContinueMainButton()).toExist();
        });
        it('has a Disabled Continue Header Button', async () => {
            await expect(loopTest.carbEntryScreen.DisabledContinueHeaderButton()).toExist();
        });
        it('has a Absorption Time Message', async () => {
            await expect(loopTest.carbEntryScreen.AbsorptionTimeMessage()).toExist();
        });
        it('has a Absorption Time Label', async () => {
            await expect(loopTest.carbEntryScreen.AbsorptionTimeLabel()).toExist();
        });
        it('has a Date Label', async () => {
            await expect(loopTest.carbEntryScreen.DateLabel()).toExist();
        });
        it('has a Amount Consumed Label', async () => {
            await expect(loopTest.carbEntryScreen.AmountConsumedLabel()).toExist();
        });
        it('has a Food Type Label', async () => {
            await expect(loopTest.carbEntryScreen.FoodTypeLabel()).toExist();
        });
    });
    describe('settings', () => {
        beforeAll(async () => {
            await loopTest.settingsScreen.Open();
        });
        afterAll(async () => {
            await loopTest.settingsScreen.Close();
        });
        it('has a done button', async () => {
            await expect(loopTest.settingsScreen.DoneButton()).toExist();
        });
        it('has a configuration header', async () => {
            await expect(loopTest.settingsScreen.ConfigurationHeader()).toExist();
        });
        it('has a pump header', async () => {
            await expect(loopTest.settingsScreen.PumpHeader()).toExist();
        });
        it('has a pump header', async () => {
            await expect(loopTest.settingsScreen.ContinuousGlucoseMonitorHeader()).toExist();
        });
        it('has a settings header', async () => {
            await expect(loopTest.settingsScreen.SettingsHeader()).toExist();
        });
        it('has a Issue Report Label', async () => {
            //TODO: this is acting like a button!
            await expect(loopTest.settingsScreen.IssueReportLabel()).toExist();
        });
        it('has a Correction Range Label', async () => {
            //TODO: this is acting like a button!
            await expect(loopTest.settingsScreen.CorrectionRangeLabel()).toExist();
        });
        it('has a Suspend Threshold label', async () => {
            //TODO: this is acting like a button!
            await expect(loopTest.settingsScreen.SuspendThresholdLabel()).toExist();
        });
        it('has a Basal Rates Label', async () => {
            //TODO: this is acting like a button!
            await expect(loopTest.settingsScreen.BasalRatesLabel()).toExist();
        });
        it('has a Delivery Limits Label', async () => {
            //TODO: this is acting like a button!
            await expect(loopTest.settingsScreen.DeliveryLimitsLabel()).toExist();
        });
        it('has a Insulin Model Label', async () => {
            //TODO: this is acting like a button!
            await expect(loopTest.settingsScreen.InsulinModelLabel()).toExist();
        });
        it('has a Carb Ratios Label', async () => {
            //TODO: this is acting like a button!
            await expect(loopTest.settingsScreen.CarbRatiosLabel()).toExist();
        });
        it('has a Insulin Sensitivities Label', async () => {
            //TODO: this is acting like a button!
            await expect(loopTest.settingsScreen.InsulinSensitivitiesLabel()).toExist();
        });
        it('has a Closed Loop button', async () => {
            await expect(loopTest.settingsScreen.ClosedLoopButton()).toExist();
        });
        it('has a Issue Report button', async () => {
            await expect(loopTest.settingsScreen.IssueReportLabel()).toExist();
        });
        it('has a Add Pump label', async () => {
            //TODO: this is acting like a button!
            await expect(loopTest.settingsScreen.AddPumpLabel()).toExist();
        });
        it('has a Add CGM label', async () => {
            //TODO: this is acting like a button!
            await expect(loopTest.settingsScreen.AddCGMLabel()).toExist();
        });
        it('has a services header', async () => {
            await loopTest.settingsScreen.ScrollToBottom();
            await expect(loopTest.settingsScreen.ServicesHeader()).toExist();
        });
    });
});
