import Mock from '../mock'

const userDB = {
    users: [
        {
            id: '5a7b73f76bed15c94d1e46d4',
            index: 0,
            guid: 'c01da2d1-07f8-4acc-a1e3-72dda7310af8',
            isActive: true,
            balance: 2838.08,
            age: 30,
            name: 'Premnath',
            gender: 'male',
            company: 'Learny Technologies',
            email: 'stefaniemarsh@acium.com',
            phone: '+91 6382709971',
            address: '13, IInd cross street pudhu nagar periyakalapet, puducherry-605014',
            bd: '2015-02-08T04:28:44 -06:00',
            imgUrl: '/assets/images/face-1.png',
        },
        {
            id: '5a7b73f7cab10f461153989c',
            index: 66,
            guid: '2562a818-4451-4193-94cd-650d131ff097',
            isActive: false,
            balance: 1652.9,
            age: 21,
            name: 'Darlene Hurley',
            gender: 'female',
            company: 'STELAECOR',
            email: 'darlenehurley@stelaecor.com',
            phone: '+1 (868) 492-2270',
            address: '627 Wilson Street, Loveland, Louisiana, 765',
            bd: '2017-05-20T12:39:31 -06:00',
            imgUrl: '/assets/images/face-2.png',
        },
        {
            id: '5a7b73f7ecccc997e4160a59',
            index: 67,
            guid: '0050170f-0283-481d-9633-dc9d134be121',
            isActive: true,
            balance: 3692.88,
            age: 21,
            name: 'Lela Bailey',
            gender: 'female',
            company: 'AQUOAVO',
            email: 'lelabailey@aquoavo.com',
            phone: '+1 (917) 449-2329',
            address: '121 Adams Street, Malo, Arkansas, 7435',
            bd: '2016-11-06T04:55:46 -06:00',
        },
    ],
}

Mock.onGet('/api/user/all').reply((config) => {
    return [200, userDB.users]
})

Mock.onGet('/api/user').reply((config) => {
    const id = config.data
    const response = userDB.users.find((user) => user.id === id)
    return [200, response]
})

Mock.onPost('/api/user/delete').reply((config) => {
    let user = JSON.parse(config.data)
    let index = { i: 0 }
    userDB.users.forEach((element) => {
        if (element.id === user.id) {
            return [200, userDB.users.splice(index.i, 1)]
        }
        index.i++
    })
    return [200, userDB.users]
})

Mock.onPost('/api/user/update').reply((config) => {
    let user = JSON.parse(config.data)
    let index = { i: 0 }
    userDB.users.forEach((element) => {
        if (element.id === user.id) {
            userDB.users[index.i] = user
            return [200, userDB.users]
        }
        index.i++
    })
    return [200, userDB.users]
})

Mock.onPost('/api/user/add').reply((config) => {
    let user = JSON.parse(config.data)
    userDB.users.push(user)
    return [200, userDB.users]
})
