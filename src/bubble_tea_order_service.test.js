const { createOrderRequest } = require('./bubble_tea_order_service')
const bubbleTeaType = require('./bubble_tea_type')
const bubbleTeaMessenger = require('./bubble_tea_messenger')
jest.mock('./bubble_tea_messenger')
jest.mock('./simple_logger')

beforeEach(() => {})

afterEach(() => {
  jest.clearAllMocks()
})

describe('test successful bubble tea order request', () => {
  // Arrange
  //dummy data
  const dummyPaymentDetails = [
    {
      name: 'Some person1',
      address: '123 Some Street',
      debitCard: {
        digits: '1234567'
      }
    },
    {
      name: 'Some person2',
      address: '123 Some Street',
      debitCard: {
        digits: '1234568'
      }
    },
    {
      name: 'Some person3',
      address: '123 Some Street',
      debitCard: {
        digits: '1234569'
      }
    }
  ]

  it.each([
    [
      {
        paymentDetails: dummyPaymentDetails[0],
        bubbleTea: {
          type: bubbleTeaType.MATCHAMILKTEA
        }
      },
      dummyPaymentDetails[0]
    ],
    [
      {
        paymentDetails: dummyPaymentDetails[1],
        bubbleTea: {
          type: bubbleTeaType.JASMINEMILKTEA
        }
      },
      dummyPaymentDetails[1]
    ],
    [
      {
        paymentDetails: dummyPaymentDetails[2],
        bubbleTea: {
          type: bubbleTeaType.LYCHEEICETEA
        }
      },
      dummyPaymentDetails[2]
    ]
  ])("when the input is '%s'", (input, output) => {
    const orderRequest = createOrderRequest(input)

    expect(orderRequest.name).toBe(output.name)
    expect(orderRequest.digits).toBe(output.debitCard.digits)
    expect(
      bubbleTeaMessenger.sendBubbleTeaOrderRequestEmail
    ).toHaveBeenCalledWith(orderRequest)
    expect(
      bubbleTeaMessenger.sendBubbleTeaOrderRequestEmail
    ).toHaveBeenCalledTimes(1)
  })
})
