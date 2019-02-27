import * as actionType from "./actionType";
import {INIT_PAGINATION} from "../../modelconfig/common/pagination.ts";
export function template(state = {pagination: INIT_PAGINATION,
                                  templateVO: {}}, 
                         action = {}){
    switch(action.type) {
        case actionType.queryTemplates:
            return {
                ...state,
                templates: action.data.templateVOList,
                pagination: action.data.pagination
            };
        case actionType.loadTemplate:
            return {
                ...state,
                templateVO: action.data
            };
        case actionType.setTemplateStatus:
            return {
                ...state,
                templates: action.data
            };
        case actionType.checkExist:
            return {
                ...state,
                templateIdentifierCodeExist: action.data
            };
        case actionType.clearTemplateVO:
            return {
                templateVO: action.data,
                pagination: state.pagination
            };
        default:
            return state;
    }
}
