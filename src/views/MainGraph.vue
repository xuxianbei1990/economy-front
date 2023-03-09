<template>
  <div>
    <MgHeader />
    <MgBody />
    <MgTail />
  </div>
</template>

<script>
import MgHeader from '@/components/MgHeader.vue'
import MgBody from '@/components/MgBody.vue'
import MgTail from '@/components/MgTail.vue'

export default {
  name: 'MainGraph',
  components: {
    MgHeader,
    MgBody,
    MgTail
  }
}
</script>
