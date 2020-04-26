const { SettingsScreen } = require('./settingsScreen');
const { CarbEntryScreen } = require('./carbEntryScreen');
const { BolusScreen } = require('./bolusScreen');
const { HomeScreen } = require('./homeScreen');
const exec = require('child_process').exec;
const match = require('./match');
const text = require('./text');
const { screenName } = require('./properties');

class Test {
    withLanguage(language) {
        this.language = language;
        return this;
    }
    withScenario(scenario) {
        this.scenario = scenario;
        return this;
    }
    withStartScreen(startScreen) {
        this.startScreen = startScreen;
        return this;
    }
    withUnits(units) {
        this.units = units;
        return this;
    }
    withSettings(settings) {
        this.settings = settings;
        return this;
    }
    withSettingsFilter(filter) {
        this.filter = filter;
        return this;
    }
    withSimulators(simulators) {
        this.simulators = simulators;
        return this;
    }

    async _loadDeviceScenariosFromDisk(deviceId) {
        const _loadDeviceScenariosFromDiskShellScript = exec(`${__dirname}/../scripts/load_scenarios.sh ${deviceId}`);
        _loadDeviceScenariosFromDiskShellScript.stdout.on('data', () => {
            return null;
        });
        _loadDeviceScenariosFromDiskShellScript.stderr.on('data', (data) => {
            throw Error(data);
        });
    }

    async _loadScenario(scenarioName) {
        await device.shake();
        await expect(match.accessible.Label(scenarioName)).toExist();
        await match.accessible.Label(scenarioName).tap();
        await match.accessible.ButtonBarButton('Load').tap();
    }

    async _setStartScreen(start) {
        switch (start) {
            case screenName.settings:
                break;
            case screenName.home:
                await this.settingsScreen.Close();
                break;
            case screenName.bolus:
                await this.settingsScreen.Close();
                await this.bolusScreen.Open();
                break;
            case screenName.carbEntry:
                await this.settingsScreen.Close();
                await this.carbEntryScreen.Open();
                break;
            default:
                await this.settingsScreen.Close();
                break;
        }
    }

    _filterSettings(values, types) {
        const filtered = values;
        if (types) {
            for (const type of types) {
                delete filtered[type];
            }
        }
        return filtered;
    }

    async prepare() {

        if (!this.language) {
            this.language = text;
        }

        this.settingsScreen = new SettingsScreen(this.language);
        this.homeScreen = new HomeScreen(this.language);
        this.bolusScreen = new BolusScreen(this.language);
        this.carbEntryScreen = new CarbEntryScreen(this.language);

        await device.launchApp({
            newInstance: true,
            permissions: { notifications: 'YES', health: 'YES' },
        });

        if (this.scenario) {
            await _loadDeviceScenariosFromDisk(device.deviceId);
            await _loadScenario(this.scenario);
            if (this.settings) {
                this.settings = this._filterSettings(this.settings, [SettingType.CGMSimulatorSettings, SettingType.AddCGMSimulator, SettingType.AddPumpSimulator]);
            }
        }

        if (this.settings) {
            await this.settingsScreen.Open();
            if (this.filter) {
                this.settings = this._filterSettings(this.settings, this.filter)
            }
            await this.settingsScreen.Apply(this.settings);
        } else if (this.simulators) {
            await this.settingsScreen.Open();
            if (this.simulators.cgm) {
                await this.settingsScreen.AddCGMSimulator();
            }
            if (this.simulators.pump) {
                await this.settingsScreen.AddPumpSimulator();
            }
        }

        if (this.startScreen) {
            await this._setStartScreen(this.startScreen);
        }
    }

    async removeData() {
        await this.settingsScreen.Open();
        await this.settingsScreen.RemoveCGMData();
        await this.settingsScreen.RemovePumpData();
        await this.settingsScreen.Close();
    }

    async advanceScenario(cycles) {
        await device.shake();
        await expect(match.accessible.Label(this.scenario)).toExist();
        await match.accessible.Label(this.scenario).swipe('left');
        await match.accessible.SwipeButton('Advance ⏭').tap();
        await match.UITextField().typeText(cycles);
        await match.accessible.Button(text.general.OK).tap();
    }
}

module.exports = {
    Test
};
