import * as React from 'react'
import type { IShapeTreeNode, TLShape } from '~types'
import { Shape } from './shape'
import type { TLShapeUtilsMap } from '~shape-utils'

interface ShapeNodeProps<T extends TLShape> extends IShapeTreeNode<T> {
  utils: TLShapeUtilsMap<TLShape>
}

export const ShapeNode = React.memo(function ShapeNode<T extends TLShape>({
  shape,
  utils,
  children,
  isEditing,
  isBinding,
  isHovered,
  isSelected,
  meta,
}: ShapeNodeProps<T>) {
  return (
    <>
      <Shape
        shape={shape}
        isEditing={isEditing}
        isBinding={isBinding}
        isHovered={isHovered}
        isSelected={isSelected}
        utils={utils[shape.type as T['type']]}
        meta={meta}
      />
      {children &&
        children.map((childNode) => (
          <ShapeNode key={childNode.shape.id} utils={utils} {...childNode} />
        ))}
    </>
  )
})
