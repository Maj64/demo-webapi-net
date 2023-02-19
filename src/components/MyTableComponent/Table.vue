<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index">
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dataRow, dataIndex) in dataSource" :key="dataIndex" @click="$emit('rowClick', {...dataRow, RowIndex: dataIndex})">
          <td v-for="(column, columnIndex) in columns" :key="columnIndex">
            <div v-if="column.template">
              <slot :rowData="{...dataRow, ColumnIndex: columnIndex, RowIndex: dataIndex} " :name="column.template" />
            </div>
            <div v-else>{{ dataRow[column.field] }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    dataSource: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
$--color-text: rgb(255, 255, 255);
$--color-border-light: #303033;
$--space-3: 24px;
.table-container {
  margin: 10px 24px;
  table {
    display: table;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0px;
    thead {
      display: table-header-group;
      tr {
        color: $--color-text;
        display: table-row;
        vertical-align: middle;
        outline: 0px;
        th {
          border-bottom: 1px solid rgb(48, 48, 51);
          display: table-cell;
          text-align: left;
          padding: 16px;
          font-size: 16px;
          line-height: 22px;
          font-weight: 400;
          color: rgb(161, 163, 167);
        }
      }
    }
    tbody {
      display: table-row-group;
      tr {
        transition: background-color 0.2s ease 0s;
        display: table-row;
        vertical-align: middle;
        outline: 0px;
        td {
          padding: 8px 0px;
          font-size: 16px;
          line-height: 22px;
          font-weight: 400;
          display: table-cell;
          border-bottom: 1px solid rgb(81, 81, 81);
          padding: 16px;
          color: rgb(255, 255, 255);
          text-align: center;
        }
      }
      .action {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
    }
  }
 }
</style>
