/* tslint:disable */
/* eslint-disable */
/**
 * go_load/v1/go_load.proto
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: version not set
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface V1GetDownloadTaskListRequest
 */
export interface V1GetDownloadTaskListRequest {
    /**
     * 
     * @type {string}
     * @memberof V1GetDownloadTaskListRequest
     */
    offset?: string;
    /**
     * 
     * @type {string}
     * @memberof V1GetDownloadTaskListRequest
     */
    limit?: string;
}

/**
 * Check if a given object implements the V1GetDownloadTaskListRequest interface.
 */
export function instanceOfV1GetDownloadTaskListRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function V1GetDownloadTaskListRequestFromJSON(json: any): V1GetDownloadTaskListRequest {
    return V1GetDownloadTaskListRequestFromJSONTyped(json, false);
}

export function V1GetDownloadTaskListRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1GetDownloadTaskListRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'offset': !exists(json, 'offset') ? undefined : json['offset'],
        'limit': !exists(json, 'limit') ? undefined : json['limit'],
    };
}

export function V1GetDownloadTaskListRequestToJSON(value?: V1GetDownloadTaskListRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'offset': value.offset,
        'limit': value.limit,
    };
}

