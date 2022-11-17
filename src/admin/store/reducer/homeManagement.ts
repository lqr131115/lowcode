import { createSlice } from "@reduxjs/toolkit";
import { parseJsonByString } from '../../../common/utils'
import * as C from '../../../common/constant'
const initSchema = parseJsonByString(window.localStorage[C.SCHEMA], {
    name: 'Page', attributes: {}, children: []
})
const initialState = {
    schema: initSchema
}
const homeManagementSlice = createSlice({
    name: "homeManagement",
    initialState,
    reducers: {
        changeSchema: (state, action) => {
            state.schema = { ...state.schema, ...action.payload }
        },
        addChild: (state, action) => {
            state.schema.children = [...state.schema.children, action.payload]
        },
        deleteChild: (state, action) => {
            state.schema.children.splice(action.payload, 1)
        },
        updateChild: (state, action) => {
            const { index, newSchema } = action.payload
            state.schema.children.splice(index, 1, newSchema)
        },
        sortChild: (state, action) => {
            state.schema.children = action.payload
        },
    },
});

export const { changeSchema, addChild, deleteChild, updateChild, sortChild } = homeManagementSlice.actions;

export default homeManagementSlice.reducer