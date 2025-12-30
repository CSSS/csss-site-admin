import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
const testProviders = [provideHttpClientTesting(), provideRouter([])];
export default testProviders;
