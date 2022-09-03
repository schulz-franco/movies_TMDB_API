const orderJobs = (crew)=> {
    let data = {}
    if (crew.length != 0) {
        crew.map(person => {
            // if the department of person not exists, I make a new department
            if (!Object.keys(data).includes(person.known_for_department)) {
                data[person.known_for_department] = []
            }
            let exist = false
            data[person.known_for_department].map(item=> {
                // if person already exists, only add the other job
                if (item["name"] == person.name) {
                    exist = true
                    item["job"].push(person.job)
                }
            }) 
            // if person not exists, add person into department
            if (!exist) {
                data[person.known_for_department].push({name: person.name, job: [person.job], image: person.profile_path, id: person.id})
            }
        })
    }
    return data
}

export default orderJobs