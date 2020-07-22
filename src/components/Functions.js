export const sortByStatus = (data) => {
  const status = Array.from(new Set(data.map((val) => val.status)))
  let applicationStatus = {}
  let statusArray = []
  status.forEach((status) => {
    data.forEach((val) => {
      if(status === val.status) {
        statusArray.push(val)
        applicationStatus[status] = statusArray
      }else {
        statusArray = []
      }
    })
  })
  return applicationStatus
}

export const getNameInitials = (name) => {
  return name.split(' ').map(x => x.charAt(0)).join('').substr(0, 2).toUpperCase()
}
