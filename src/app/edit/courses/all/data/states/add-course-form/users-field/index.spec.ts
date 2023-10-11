import { UnexpectedRequestError } from '@/app/data/error/request-error'
import { Nothing } from '@/app/data/events'
import { Administrator } from '@/app/data/user'
import { Effect, Equal, pipe } from 'effect'
import { describe, expect, it } from 'vitest'
import { UsersField } from '.'
import { UserInputService } from '../../../../components/add-course-form/components/users-field/user-input'
import { AddUserEvent } from '../../../events/users-field-event'
import { InvalidUsersField } from './invalid'

describe('UsersField.on Nothing', () => {
  const service = UserInputService.of({
    getUser: () => Effect.succeed(Administrator.of('richard_01')),
    field: InvalidUsersField.ofInput('richard_x'),
    setField: () => {},
  })
  it('should not change user field when event is nothing', async () => {
    //arrange
    const event = Nothing.self
    //act
    const result = await pipe(
      UsersField.on(event),
      Effect.provideService(UserInputService.context, service),
      Effect.merge,
      Effect.runPromise
    )
    //assert
    expect(Equal.equals(service.field, result)).toBe(true)
  })
})

describe('UsersField.on AddUserEvent', () => {
  const service = UserInputService.of({
    getUser: () => Effect.succeed(Administrator.of('richard_01')),
    field: InvalidUsersField.ofInput('richard_01'),
    setField: () => {},
  })

  it('should return valid user field without error when get user success', async () => {
    //arrange
    const event = AddUserEvent.self
    const service = UserInputService.of({
      getUser: () => Effect.succeed(Administrator.of('richard_01')),
      field: InvalidUsersField.ofInput('richard_01'),
      setField: () => {},
    })
    //act
    const result = await pipe(
      UsersField.on(event),
      Effect.provideService(UserInputService.context, service),
      Effect.runPromise
    )
    //assert
    expect(result._tag).toBe('ValidUsersField')
    expect(result.error._tag).toBe('None')
  })

  it('should return invalid user field with error when get user failed', async () => {
    //arrange
    const event = AddUserEvent.self
    const fakeGetUserError = UnexpectedRequestError.of({
      error: '',
      method: 'GET',
      url: '',
    })
    const service = UserInputService.of({
      getUser: () => Effect.fail(fakeGetUserError),
      field: InvalidUsersField.ofInput('richard_01'),
      setField: () => {},
    })
    //act
    const result = await pipe(
      UsersField.on(event),
      Effect.provideService(UserInputService.context, service),
      Effect.runPromise
    )
    //assert
    expect(result._tag).toBe('InvalidUsersField')
    expect(result.error._tag).toBe('Some')
  })
})
