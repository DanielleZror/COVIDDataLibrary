(function (global) {

    const ALL = "ALL"
    const NEW = "NEW"
    const TOTAL = "TOTAL"

    var CoronaData = () => {
        return new CoronaData.init();
    }

    function getGlobalData(pattern) {
        return new Promise((resolve, reject) => {
            $.get('https://api.covid19api.com/summary', (data) => {
                resolve(buildResult(data.Global, pattern))
            })
        })
    }

    function getDataCountry(CountryCode, pattern) {
        return new Promise((resolve, reject) => {
            $.get('https://api.covid19api.com/summary', (data) => {
                let result = data.Countries.find(ele => ele.CountryCode === CountryCode.toUpperCase())
                if (result) {
                    resolve(buildResult(result, pattern))
                } else {
                    reject(`${CountryCode} is not a country code`)
                }
            })
        })
    }
   
    function buildResult(result, pattern) {
        let data = result
        switch(pattern) {
            case(ALL):
                data = result
                break;
            case(TOTAL):
                data = {totalConfirmed: result.TotalConfirmed,
                        totalDeaths: result.TotalDeaths,
                        totalRecovered: result.TotalRecovered}
                break;
            case(NEW):
                data = {newConfirmed: result.NewConfirmed,
                        newDeaths: result.NewDeaths,
                        newRecovered: result.NewRecovered}
                break;
        }

        return data
    }

    CoronaData.prototype = {

        getAllGlobalData: () => {
            return getGlobalData(ALL)
        },
        getGlobalTotal: () => {
            return getGlobalData(TOTAL)
        },
        getGlobalNew: () => {
            return getGlobalData(NEW)
        },
        getAllDataByCountry: (CountryCode) => {
            return getDataCountry(CountryCode, ALL)
        },
        getNewDataByCountry: (CountryCode) => {
            return getDataCountry(CountryCode, NEW)
        },
        getTotalDataByCountry: (CountryCode) => {
            return getDataCountry(CountryCode, TOTAL)
        }

    }

    CoronaData.init = function () {
        var self = this;

    }

    CoronaData.init.prototype = CoronaData.prototype;

    global.CoronaData = global.$$ = CoronaData;

}(window, jQuery))
