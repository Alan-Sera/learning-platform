# Auditoría inicial — GEMA Quality Pilot

Fecha de preparación: 2026-10-27
Repositorio: https://github.com/Alan-Sera/learning-platform

## Alcance y limitación

El repositorio no pudo inspeccionarse desde este entorno. Todo lo siguiente está **PENDIENTE DE VERIFICACIÓN**: rama predeterminada, árbol de archivos, versiones exactas de Next.js/TypeScript/pnpm, configuración ESLint, vulnerabilidades reales, existencia de pruebas, cobertura, despliegues, secretos expuestos y métricas DORA.

No interpretar **PENDIENTE** como aprobado ni como vulnerable.

## Línea base por confirmar

| Control | Estado | Evidencia por registrar |
|---|---|---|
| package.json en raíz | Pendiente | scripts y packageManager |
| pnpm-lock.yaml | Pendiente | commit y compatibilidad |
| ESLint | Pendiente | ejecución `pnpm exec eslint .` |
| TypeScript | Pendiente | ejecución `pnpm exec tsc --noEmit` |
| Vulnerabilidades en dependencias | Pendiente | ejecución `pnpm audit --audit-level high` |
| CodeQL/SAST | Pendiente | GitHub Security > Code scanning |
| Dependabot | Pendiente | configuración y alertas |
| Pruebas automatizadas | Pendiente | scripts e informe |
| Complejidad ciclomática | Pendiente | regla ESLint / informe Sonar |
| Protección de rama | Pendiente | reglas existentes |
| DORA y telemetría | Pendiente | proveedor CI/CD + incidentes |

## Prioridades sugeridas

1. P0: secretos expuestos, vulnerabilidades explotables críticas/altas confirmadas, autenticación/autorización rota.
2. P1: errores TypeScript, fallas de lint relevantes, falta de tests en rutas críticas.
3. P2: complejidad alta, duplicación, cobertura incremental, DORA.

## Resultados reales a añadir

- SHA/fecha de revisión:
- Rama principal:
- Versión Node/pnpm:
- Estado ESLint:
- Estado TypeScript:
- Hallazgos de auditoría de dependencias (con IDs de aviso):
- Estado CodeQL/Sonar:
- Pruebas existentes:
- Plan de remediación:
