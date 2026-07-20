import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { FormModal, TextField, createDefaultValues, toast } from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'
import type { MapStation } from '@/providers/RailwayMapProvider'

const schema = z.object({
  name: z.string().min(1)
})

function EditStationNameModal({
  onClose,
  data: { mapId, station }
}: {
  onClose: () => void
  data: {
    mapId: string
    station: MapStation
  }
}) {
  const queryClient = useQueryClient()

  const form = useForm({
    defaultValues: {
      ...createDefaultValues(schema),
      name: station.name
    },
    resolver: zodResolver(schema)
  })

  const updateMutation = useMutation(
    forgeAPI.maps.update
      .input({
        id: mapId
      })
      .mutationOptions({
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: forgeAPI.maps.key
          })
          toast.success('Station name updated')
        },
        onError: () => {
          toast.error('Failed to update station name')
        }
      })
  )

  return (
    <FormModal
      form={form}
      submissionConfig={{
        template: 'update',
        handler: async formData => {
          await updateMutation.mutateAsync({
            stationId: station.id,
            name: formData.name
          })
        }
      }}
      uiConfig={{
        icon: 'tabler:pencil',
        onClose,
        title: 'Edit Station Name'
      }}
    >
      <TextField
        autoFocus
        required
        control={form.control}
        icon="tabler:sign-right"
        label="Station Name"
        name="name"
        placeholder="Enter station name"
      />
    </FormModal>
  )
}

export default EditStationNameModal
