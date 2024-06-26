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
 * @interface V1DeleteDownloadTaskRequest
 */
export interface V1DeleteDownloadTaskRequest {
    /**
     * 
     * @type {string}
     * @memberof V1DeleteDownloadTaskRequest
     */
    downloadTaskId?: string;
}

/**
 * Check if a given object implements the V1DeleteDownloadTaskRequest interface.
 */
export function instanceOfV1DeleteDownloadTaskRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function V1DeleteDownloadTaskRequestFromJSON(json: any): V1DeleteDownloadTaskRequest {
    return V1DeleteDownloadTaskRequestFromJSONTyped(json, false);
}

export function V1DeleteDownloadTaskRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1DeleteDownloadTaskRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'downloadTaskId': !exists(json, 'downloadTaskId') ? undefined : json['downloadTaskId'],
    };
}

export function V1DeleteDownloadTaskRequestToJSON(value?: V1DeleteDownloadTaskRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'downloadTaskId': value.downloadTaskId,
    };
}

