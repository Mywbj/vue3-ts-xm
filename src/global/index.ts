import { App } from 'vue'
import './register-element-css'
import { registerProperties } from './register-properties'
export default function globalRegister(app: App): void {
  registerProperties(app)
}
