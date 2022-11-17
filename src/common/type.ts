type Schema = {
    name: string,
    attributes?: { [key: string]: any },
    children?: Schema[]
}

export {
    type Schema
}