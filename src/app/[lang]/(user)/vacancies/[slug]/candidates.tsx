import { FunctionComponent, useEffect, useState, DragEvent } from 'react'

import { Column, Desk, Stage, Status, Task } from '@/common/types'
import { WithPreload } from '@/ui-components'

import ColumnItem from './column-item'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useUpdateTask } from '@/api'

type CandidatesProps = {
  refetch: () => void
  desk: Desk
  vacancyStatus: Status
}

const Candidates: FunctionComponent<CandidatesProps> = ({
  desk,
  vacancyStatus,
  refetch,
}) => {
  const t = useTranslations('vacancy-details')
  const { slug: vacancyId } = useParams<{ slug: string }>()

  const [board, setBoard] = useState<Array<Column>>()
  const [currentColumn, setCurrentColumn] = useState<Column>()
  const [currentItem, setCurrentItem] = useState<Task>()

  const { mutate: updateTask, reset, data, ...status } = useUpdateTask()

  const columnColors = [
    'bg-yellow',
    'bg-blueLight',
    'bg-red',
    'bg-blue',
    'bg-green',
    'bg-purple',
  ]

  const initialBoard: Array<Column> = (
    Object.keys(Stage) as Array<keyof typeof Stage>
  ).map((key, index) => {
    return {
      id: index,
      title: t(key),
      color: columnColors[index],
      items: desk?.tasks
        ?.filter((item) => item.column === Stage[key])
        .map((item) => ({
          ...item,
          isOpen: false,
        })),
    }
  })

  useEffect(() => {
    if (status.isSuccess || status.isError) {
      refetch()
    }
  }, [status.isSuccess, status.isError, refetch])

  useEffect(() => {
    if (vacancyStatus.isSuccess && !vacancyStatus.isLoading)
      setBoard(initialBoard)
  }, [initialBoard, vacancyStatus])

  const sortedItems = (column: Column) =>
    board?.map((boardItem) => {
      if (boardItem?.id === column.id) {
        return column
      }
      if (boardItem?.id === currentColumn?.id) {
        return currentColumn
      }

      return boardItem
    })

  const dropHandler = (e: DragEvent, column: Column, item: Task) => {
    e.stopPropagation()

    const index = currentColumn?.items.indexOf(currentItem as Task)
    currentColumn?.items.splice(index as number, 1)
    const dropIndex = column.items.indexOf(item)
    column.items.splice(dropIndex, 0, currentItem as Task)

    setBoard(sortedItems(column))
  }

  const dragStartHandler = (e: DragEvent, column: Column, item: Task) => {
    setCurrentColumn(column)
    setCurrentItem(item)
  }

  const dragOverHandler = (e: DragEvent) => e.preventDefault()

  const dropCardHandler = (e: DragEvent, column: Column) => {
    e.stopPropagation()

    column.items.push(currentItem as Task)
    const index = currentColumn?.items.indexOf(currentItem as Task)
    currentColumn?.items.splice(index as number, 1)

    setBoard(sortedItems(column))
    updateTask({
      vacancyId,
      id: currentItem?.id || '0',
      column: column.title,
    })
  }

  const columns = board?.map((item) => (
    <ColumnItem
      key={item.id}
      dropHandler={dropHandler}
      dragStartHandler={dragStartHandler}
      dragOverHandler={dragOverHandler}
      dropCardHandler={dropCardHandler}
      setDesk={setBoard}
      refetch={refetch}
      column={item}
      desk={board}
    />
  ))

  return (
    <div className="my-6">
      <WithPreload
        isLoading={vacancyStatus.isLoading && !status.isSuccess}
        isSuccess={vacancyStatus.isSuccess}
        isError={vacancyStatus.isError}
      >
        <div
          className={`
        grid overflow-x-auto grid-flow-col gap-6
        ${(status.isPending || vacancyStatus.isLoading) && 'pointer-events-none	opacity-50'} 
      `}
        >
          {columns}
        </div>
      </WithPreload>
    </div>
  )
}

export default Candidates
