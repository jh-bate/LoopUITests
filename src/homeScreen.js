const match = require('./match');
const text = require('./text');

class HomeScreen {
    /**
     * @example home.ActiveCarbohydratesLabel().tap();
     */
    ActiveCarbohydratesLabel() {
        return match.accessible.Label(text.homeScreen.ActiveCarbohydrates);
    }
    /**
     * @example home.ActiveInsulinLabel().tap();
     */
    ActiveInsulinLabel() {
        return match.accessible.Label(text.homeScreen.ActiveInsulin);
    }
    /**
     * @example home.InsulinDeliveryLabel().tap();
     */
    InsulinDeliveryLabel() {
        return match.accessible.Label(text.homeScreen.InsulinDelivery);
    }
    /**
     * @example home.GlucoseLabel().tap();
     */
    GlucoseLabel() {
        return match.accessible.Label(text.homeScreen.Glucose);
    }
    /**
     * @example home.SettingsButton().tap();
     */
    SettingsButton() {
        return match.accessible.Button(text.settingsScreen.Settings);
    }
    OverridesButton() {
        return match.accessible.Button(text.overridesScreen.WorkoutTargets);
    }
    AddMealButton() {
        return match.accessible.Button(text.carbEntryScreen.AddMeal);
    }
    BolusButton() {
        return match.accessible.Button(text.bolusScreen.Bolus);
    }
    async OpenActiveCarbohydratesChart() {
        await this.ActiveCarbohydratesLabel().tap();
    }
    async OpenActiveInsulinChart() {
        await this.ActiveInsulinLabel().tap();
    }
    async OpenInsulinDeliveryChart() {
        await this.InsulinDeliveryLabel().tap();
    }
    async OpenGlucoseChart() {
        await this.GlucoseLabel().tap();
    }
    async CloseChart() {
        await match.accessible.BackButton(text.general.Status).tap();
    }
    async ExpectLoopNotYetRun() {
        await expect(match.loop.Icon()).toHaveLabel(text.homeScreen.LoopWaitingForFirstRun);
    }
    async TapLoopIcon() {
        await match.loop.Icon().tap();
    }
    async ExpectLoopStatusCarbsAlert() {
        await this.TapLoopIcon();
        await expect(match.accessible.AlertLabel(text.alerts.MissingCarbEffects)).toExist();
        await match.accessible.Button(text.general.OK).tap();
    }
    async ExpectLoopStatusInsulinAlert() {
        await this.TapLoopIcon();
        await expect(match.accessible.AlertLabel(text.alerts.MissingInsulinEffects)).toExist();
        await match.accessible.Button(text.general.OK).tap();
    }
    async ExpectLoopStatusConfigurationAlert() {
        await this.TapLoopIcon();
        await expect(match.accessible.AlertLabel(text.alerts.ConfigurationError)).toExist();
        await match.accessible.Button(text.general.OK).tap();
    }
    async ExpectLoopStatusGlucoseDataAlert() {
        await this.TapLoopIcon();
        await expect(match.accessible.AlertLabel(text.alerts.MissingGlucoseData)).toExist();
        await match.accessible.Button(text.general.OK).tap();
    }
    async ExpectSuccessfulLoop() {
        await this.TapLoopIcon();
        await expect(match.accessible.Alert()).toNotExist();
    }
}

module.exports = { HomeScreen };
