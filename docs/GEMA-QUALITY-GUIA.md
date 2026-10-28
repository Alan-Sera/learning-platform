# GEMA Quality — Inicio de piloto

Repositorio objetivo: https://github.com/Alan-Sera/learning-platform
Stack informado por el propietario: Next.js, TypeScript, pnpm.

> IMPORTANTE: El contenido real del repositorio no pudo recuperarse durante la preparación de este kit (27-oct-2026). La estructura, rama predeterminada, versiones y scripts siguen sin verificar. No se realizó un análisis de vulnerabilidades del código ni se modificó GitHub.

## Paso 0. Comprobar el proyecto

Desde la raíz del repositorio local:

```bash
pwd
git status --short --branch
git branch --show-current
node -v
pnpm -v
node -p "JSON.stringify(({name,packageManager,scripts}) => ({name,packageManager,scripts}))(require('./package.json')), null, 2)"
ls -la pnpm-lock.yaml tsconfig.json
```

Confirma si hay carpetas `src`, `app`, `tests` o `e2e` y si el `package.json` está en la raíz. Si es monorepo, estos archivos deben adaptarse a la ubicación de los paquetes.

## Paso 1. Línea base local (sin subir cambios)

```bash
pnpm install --frozen-lockfile
pnpm exec eslint .
pnpm exec tsc --noEmit
pnpm audit --audit-level high
```

Anota resultados en `AUDITORIA_INICIAL.md`. Ejecuta `pnpm test` o `pnpm run build` solo si existen esos scripts y cuentas con las variables de entorno necesarias. No publiques secretos ni copies archivos `.env` a los reportes.

## Paso 2. Preparar pnpm y complejidad

Comprueba que `package.json` incluya una versión real de pnpm fijada con `packageManager`, por ejemplo `"packageManager": "pnpm@10.x.y"` (reemplazar por la versión que efectivamente usa el proyecto: no copiar `x.y`). No cambies pnpm solo para satisfacer CI.

En el bloque `rules` de la configuración ESLint existente, agrega inicialmente:

```js
complexity: ['warn', { max: 10 }],
```

No reemplaces el archivo completo de ESLint: Next.js puede usar configuración plana (`eslint.config.mjs`) o archivos distintos. Primera fase: advertencias y línea base; después de corregir el código nuevo, considera `error`.

## Paso 3. Crear una rama y agregar los archivos

```bash
git switch -c chore/gema-quality-pilot
# Copia .github/workflows/gema-quality.yml, .github/dependabot.yml,
# y .github/pull_request_template.md a la raíz del repositorio.
git add .github
git commit -m "ci: add GEMA Quality baseline"
git push -u origin chore/gema-quality-pilot
```

Abre un Pull Request a la rama predeterminada real (si no es `main`, corrige el workflow). En la pestaña Actions verifica que `GEMA Quality - Baseline` se haya ejecutado; un fallo es un hallazgo de la línea base, no prueba de que el repositorio sea inseguro en general.

## Paso 4. Seguridad integrada de GitHub (sin archivos adicionales)

En el repositorio > Settings > Security and analysis / Advanced Security (etiquetas pueden variar):

1. Habilita Dependabot alerts y Dependabot security updates.
2. Activa CodeQL > Default setup para JavaScript/TypeScript.
3. Comprueba que no haya otro workflow CodeQL configurado antes de duplicar escaneos.
4. Habilita detección de secretos y protección de pushes si están disponibles para el repositorio/plan.

Consulta: https://docs.github.com/en/code-security/how-tos/find-and-fix-code-vulnerabilities/configure-code-scanning/configure-code-scanning

## Paso 5. SonarQube Cloud (etapa siguiente)

1. Importa el repositorio público en https://sonarcloud.io.
2. Comprueba si la detección y el análisis automáticos admiten la estructura del proyecto.
3. Si sí, analiza la rama principal y los PR con esa integración; no agregues un segundo scanner por duplicado.
4. Si no, configura GitHub Actions con los identificadores y token que Sonar genere para tu proyecto. Nunca escribas `SONAR_TOKEN` dentro de un archivo versionado.
5. Revisa el Quality Gate y genera una línea base de deuda técnica. Bloquea solo problemas nuevos priorizados cuando la configuración sea estable.

## Paso 6. Protección de rama (tras validar el primer PR)

Settings > Branches o Rules > Rulesets: selecciona la rama predeterminada y pide que se apruebe el PR y que pase el check `ESLint + TypeScript + Dependency Audit`. No marques un check requerido que todavía no exista: bloquearía merges. En un equipo unipersonal, una aprobación obligatoria puede dificultar el trabajo; define revisores o no la exijas inicialmente.

## Paso 7. Pruebas y estabilidad

- Tras confirmar el framework de pruebas, añade `pnpm run test:ci` al job. No presentes el pipeline actual como pruebas automatizadas completas: solo ejecuta ESLint, TypeScript y auditoría de dependencias.
- Después incorpora pruebas de integración, pruebas end-to-end para flujos críticos y un build verificado con variables seguras.
- Registra despliegues reales, incidentes y correcciones en `REGISTRO-DORA.csv` hasta poder automatizar DORA con el proveedor de despliegue.
- Para comparar variantes visuales, adopta Storybook y Playwright cuando la estructura real del frontend haya sido confirmada.

## Nota de seguridad sobre Trivy

En marzo de 2026 hubo un incidente de cadena de suministro que afectó artefactos y etiquetas del ecosistema Trivy. Por ello **no** lo instalamos en el pipeline inicial sin revisar versión y SHA seguros. En una segunda fase puede incorporarse con una versión verificada y referencias inmutables. Ver: https://github.com/aquasecurity/trivy/security/advisories/GHSA-69fq-xp46-6x23

## Resultado esperado de la primera iteración

- 1 PR con CI visible.
- Dependabot y CodeQL activados.
- Resultado real de ESLint, tsc y pnpm audit registrado.
- Lista de hallazgos priorizada.
- Criterios claros para adoptar Sonar y protección de rama.
