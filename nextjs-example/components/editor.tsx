import * as React from 'react'
import {
  Renderer,
  TLBinding,
  TLPage,
  TLPageState,
  TLPointerEventHandler,
  TLShape,
  TLShapeUtilsMap,
} from '@tldraw/core'
import { BoxShape, LabelShape, BoxUtil, LabelUtil } from '../shapes'

type Shape = BoxShape | LabelShape

export const shapeUtils: TLShapeUtilsMap<Shape> = {
  box: new BoxUtil(),
  label: new LabelUtil(),
}

export default function Editor(): JSX.Element {
  const [page, setPage] = React.useState<TLPage<Shape, TLBinding>>({
    id: 'page1',
    shapes: {
      box1: {
        id: 'box1',
        type: 'box',
        parentId: 'page1',
        name: 'Box',
        childIndex: 1,
        rotation: 0,
        point: [0, 0],
        size: [100, 100],
      },
    },
    bindings: {},
  })

  const [pageState, setPageState] = React.useState<TLPageState>({
    id: 'page1',
    selectedIds: [],
    camera: {
      point: [0, 0],
      zoom: 1,
    },
  })

  const [meta, setMeta] = React.useState({
    isDarkMode: false,
  })

  const handleShapeHover: TLPointerEventHandler = (e) => {
    console.log(e.target)
  }

  const handleShapePoint: TLPointerEventHandler = (e) => {
    console.log(e.target)
  }

  const handleShapeDrag: TLPointerEventHandler = (e) => {
    console.log('hi')

    setPage((page) => ({
      ...page,
      shapes: {
        ...page.shapes,
        [e.target]: {
          ...page.shapes[e.target],
          point: e.point,
        },
      },
    }))
  }

  return (
    <div className="tldraw">
      <Renderer
        shapeUtils={shapeUtils}
        page={page}
        pageState={pageState}
        meta={meta}
        onDragShape={handleShapeDrag}
        onPointShape={handleShapePoint}
        onHoverShape={handleShapeHover}
        // onDoubleClickBounds={appState.onDoubleClickBounds}
        // onDoubleClickShape={appState.onDoubleClickShape}
        // onPointCanvas={appState.onPointCanvas}
        // onPointerDown={appState.onPointerDown}
        // onPointerMove={appState.onPointerMove}
        // onPointerUp={appState.onPointerUp}
        // onShapeChange={appState.onShapeChange}
      />
    </div>
  )
}
