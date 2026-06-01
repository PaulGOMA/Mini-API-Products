import { ValidationError } from "../errors/error.validation.ts";

export function assertHasRequiredFields(fields: string[], data: Record<string, unknown>): void {
    const hasField = (field: string) => data.hasOwnProperty(field);
    if(!fields.every(hasField)) 
        throw new ValidationError("Les données fournies sont incomplètes");
}

export function assertTypeField(field: string, type: string, data: Record<string, unknown>): void {
    if(typeof data[field] !== type)
        throw new ValidationError("Le type de la donnée est invalid");
}

export function assertIsValidUUID(value: string):boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

