var g = $$();
console.log(g)
g.getAllGlobalData()
    .then((result) => {console.log(result) })

g.getGlobalTotal()
    .then((result) => {console.log(result) })

g.getGlobalNew()
    .then((result) => {console.log(result) })

g.getAllDataByCountry("ilj")
    .then((result) => {console.log(result) })

g.getTotalDataByCountry("il")
    .then((result) => {console.log(result) })

g.getNewDataByCountry("il")
.then((result) => {console.log(result) })