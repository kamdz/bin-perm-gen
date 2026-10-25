# Changelog

## [2.0.0](https://github.com/kamdz/bin-perm-gen/compare/v1.0.6...v2.0.0) (2026-10-25)


### ⚠ BREAKING CHANGES

* ESM-only package, requires Node >=22.12. Arguments are validated eagerly and throw RangeError. The CLI prints one permutation per line (string format by default) instead of a JSON array of booleans.

### Features

* modernize stack and rewrite generator ([2b4fb31](https://github.com/kamdz/bin-perm-gen/commit/2b4fb3125cd35d214bd4a002cf2149779e6b8265))


### Bug Fixes

* **deps:** bump @octokit/endpoint from 10.1.1 to 10.1.3 in the npm_and_yarn group ([5badade](https://github.com/kamdz/bin-perm-gen/commit/5badade7eec2bcf209830755cce08f7bc36d28db))
* **deps:** bump @octokit/endpoint in the npm_and_yarn group ([4723785](https://github.com/kamdz/bin-perm-gen/commit/472378563dda216babb4197011b647528146ef24))
* validate format eagerly and reject extra CLI arguments ([6e13ef5](https://github.com/kamdz/bin-perm-gen/commit/6e13ef5e4f5e2a5cffd283881d3a95836e05e95e))

## [1.0.6](https://github.com/kamdz/bin-perm-gen/compare/v1.0.5...v1.0.6) (2025-01-27)

### Bug Fixes

- exports ([3e944e4](https://github.com/kamdz/bin-perm-gen/commit/3e944e47000f9bef2036958ff0139f5e61598d05))

## [1.0.5](https://github.com/kamdz/bin-perm-gen/compare/v1.0.4...v1.0.5) (2024-11-27)

### Bug Fixes

- **deps:** bump cross-spawn in the npm_and_yarn group ([2b3b3bc](https://github.com/kamdz/bin-perm-gen/commit/2b3b3bc6b095be16c5e14962cee4402e144ab671))

## [1.0.4](https://github.com/kamdz/bin-perm-gen/compare/v1.0.3...v1.0.4) (2024-11-16)

### Bug Fixes

- export types ([449194f](https://github.com/kamdz/bin-perm-gen/commit/449194f54499a95d3ed990cbec967547ea2b501a))

## [1.0.3](https://github.com/kamdz/bin-perm-gen/compare/v1.0.2...v1.0.3) (2024-10-29)

### Bug Fixes

- small refactor ([4e65199](https://github.com/kamdz/bin-perm-gen/commit/4e65199b72596c78bf9d264cfdcd456bed3fd5c9))

## [1.0.2](https://github.com/kamdz/bin-perm-gen/compare/v1.0.1...v1.0.2) (2024-10-29)

### Bug Fixes

- **typings:** strict typing ([04b6f29](https://github.com/kamdz/bin-perm-gen/commit/04b6f293722a843c697c5e800aa3e2cb85561b01))

## [1.0.1](https://github.com/kamdz/bin-perm-gen/compare/v1.0.0...v1.0.1) (2024-10-29)

### Bug Fixes

- **typings:** typings overload ([15a4672](https://github.com/kamdz/bin-perm-gen/commit/15a467269b07d5ac658b01117fc00b6c6aef7a8d))

# 1.0.0 (2024-10-28)

### Bug Fixes

- delete export getPermutationCount ([10d7984](https://github.com/kamdz/bin-perm-gen/commit/10d798447bc5b6d74aacb92d50b5ce2f99a5d557))
