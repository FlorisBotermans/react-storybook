import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent, waitFor, fireEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import EditableOverview from '../assets/ts/components/EditableOverview/EditableOverview';
import data from '../assets/ts/data/editable-overview';

export default {
  title: 'Organisms/EditableOverview',
  component: EditableOverview,
  parameters: {
    mockData: [
      {
        url: '/app/ajax/opleidingen/items.json',
        method: 'GET',
        status: 200,
        response: [
          {
            id: 4,
            index: 1,
            title: 'Basisopleiding Beeldende Kunst'
          },
          {
            id: 1,
            index: 2,
            title: 'Fashion Design'
          },
          {
            id: 2,
            index: 0,
            title: 'Product Design'
          }
        ]
      },
      {
        url: '/',
        method: 'GET',
        status: 200,
        response: [
          {
            id: 1,
            title: 'Fashion Design',
            groups: ['Design']
          },
          {
            id: 2,
            title: 'Product Design',
            groups: ['Design']
          },
          {
            id: 3,
            title: 'Spatial Design',
            groups: ['Design', 'Beeldende Kunst']
          },
          {
            id: 4,
            title: 'Basisopleiding Beeldende Kunst',
            groups: ['Beeldende Kunst']
          },
          {
            id: 5,
            title: 'Brede Basisopleiding',
            groups: ['Beeldende Kunst']
          },
          {
            id: 6,
            title: 'Fine Art',
            groups: ['Beeldende Kunst']
          },
          {
            id: 7,
            title: 'Interaction Design',
            groups: ['Games en Interactie']
          }
        ]
      },
      {
        url: '/',
        method: 'PUT',
        status: 201,
        response: {}
      },
      {
        url: 'http://localhost:6006/app/ajax/opleidingen/delete.json?id',
        method: 'DELETE',
        status: 202,
        response: {}
      },
      {
        url: '/',
        method: 'POST',
        status: 200,
        response: {}
      }
    ]
  }
} as ComponentMeta<typeof EditableOverview>;

const Template: ComponentStory<typeof EditableOverview> = (args) => <EditableOverview {...args} />;

export const Default = Template.bind({});
Default.args = data;

export const DeletedItem = Template.bind({});
DeletedItem.args = data;
DeletedItem.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitFor(() => expect(canvas.getByTestId(2)).toBeInTheDocument());
  const item = canvas.getByTestId(2);
  await userEvent.click(item);

  expect(item).not.toBeInTheDocument();
}

export const AddedItem = Template.bind({});
AddedItem.args = data;
AddedItem.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);

	await waitFor(() => expect(canvas.getByTestId(2)).toBeInTheDocument());
	const addOverviewItemButton = canvas.getByText('Toevoegen');
	await userEvent.click(addOverviewItemButton);

	const textField = canvas.getByRole('textbox');
	await userEvent.type(textField, 'design');

	await waitFor(() => expect(canvas.getByTestId('Beeldende Kunst')).toBeInTheDocument());

	const designTab = canvas.getByTestId('Beeldende Kunst');
	await userEvent.click(designTab);

	const addAvailableOverviewItemButton = canvas.getByTestId('Fine Art');
	await userEvent.click(addAvailableOverviewItemButton);

	const closeButton = canvas.getByTitle('Sluiten');
	await userEvent.click(closeButton);

	await waitFor(() => expect(canvas.getByTestId(6)).toBeInTheDocument());

	const newItem = canvas.getByTestId(6);
	expect(newItem).toBeInTheDocument();
}

export const OrderedItem = Template.bind({});
OrderedItem.args = data;
OrderedItem.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitFor(() => expect(canvas.getByTestId(2)).toBeInTheDocument());
  const item = canvas.getByTestId('test2');
  await drag(item, {
    to: null,
    delta: { x: 0, y: 50 }
  })
}

function isElement(obj) {
  if (typeof obj !== 'object') {
    return false
  }
  let prototypeStr, prototype
  do {
    prototype = Object.getPrototypeOf(obj)
    // to work in iframe
    prototypeStr = Object.prototype.toString.call(prototype)
    // '[object Document]' is used to detect document
    if (
      prototypeStr === '[object Element]' ||
      prototypeStr === '[object Document]'
    ) {
      return true
    }
    obj = prototype
    // null is the terminal of object
  } while (prototype !== null)
  return false
}

function getElementClientCenter(element) {
  const { left, top, width, height } = element.getBoundingClientRect()
  return {
    x: left + width / 2,
    y: top + height / 2
  }
}

const getCoords = charlie =>
  isElement(charlie) ? getElementClientCenter(charlie) : charlie

const sleep = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms)
  })

async function drag(
  element,
  { to: inTo, delta, steps = 2, duration = 500 }
) {
  const from = getElementClientCenter(element)
  const to = delta
    ? {
      x: from.x + delta.y,
      y: from.y + delta.y
    }
    : getCoords(inTo)

  const step = {
    x: (to.x - from.x) / steps,
    y: (to.y - from.y) / steps
  }

  const current = {
    clientX: from.x,
    clientY: from.y
  }

  fireEvent.mouseEnter(element, current)
  fireEvent.mouseOver(element, current)
  fireEvent.mouseMove(element, current)
  fireEvent.mouseDown(element, current)

  for (let i = 0; i < steps; i++) {
    current.clientX += step.x
    current.clientY += step.y
    await sleep(duration / steps)
    fireEvent.mouseMove(element, current)
  }
  fireEvent.mouseUp(element, current)
}