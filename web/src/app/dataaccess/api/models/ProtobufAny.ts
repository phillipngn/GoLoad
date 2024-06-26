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
 * @interface ProtobufAny
 */
export interface ProtobufAny {
    [key: string]: object | any;
    /**
     * 
     * @type {string}
     * @memberof ProtobufAny
     */
    type?: string;
}

/**
 * Check if a given object implements the ProtobufAny interface.
 */
export function instanceOfProtobufAny(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ProtobufAnyFromJSON(json: any): ProtobufAny {
    return ProtobufAnyFromJSONTyped(json, false);
}

export function ProtobufAnyFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProtobufAny {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
            ...json,
        'type': !exists(json, '@type') ? undefined : json['@type'],
    };
}

export function ProtobufAnyToJSON(value?: ProtobufAny | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
            ...value,
        '@type': value.type,
    };
}

