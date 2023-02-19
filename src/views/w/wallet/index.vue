<template>
  <div class="app-container">
    <div class="feature-container">
      <div class="feature-header">Wallet</div>
      <div class="feature-item">
        <button class="btn btn-add" @click="handleAdd">Add</button>
      </div>
    </div>
    <Table
      :columns="columns"
      :data-source="wallets"
    >
      <template v-slot:required="{rowData}">
        <div class="action-item"><div>{{ rowData.numConfirmationsRequired }}</div><button class="btn btn-edit" @click="deposit(columnData)">Edit</button></div>
      </template>
      <template v-slot:action="{rowData}">
        <div class="action">
          <div class="action-item"><button class="btn-size deposit-btn btn-normal" @click="deposit(rowData)">Deposit</button></div>
          <div class="action-item"><button class="btn withdraw-btn" @click="duplicate(rowData)">Withdraw</button></div>
        </div>
      </template>
    </Table>
    <Form :dialog-data="dialogData" :data-form="wallet" :form-list="formList">
      <template v-slot:owners>
        <div class="owner-header">
          <h3>Owners</h3>
          <div class="action-item"><button class="btn">Add</button></div>
        </div>
        <Table :columns="columnOwner" :data-source="wallet.owners">
          <template v-slot:input>
            <el-input v-modal="owner.name" type="text" />
          </template>
          <template v-slot:action>
            <div class="action-item"><button class="btn btn-danger">Remove</button></div>
          </template>
        </Table>
      </template>
      <template v-slot:footerDialog>
        <el-button type="info" class="btn-normal btn-cancel" plain @click="handleCancel">Cancel</el-button>
        <el-button type="success" class="btn" @click="handleAddSubmit">Add</el-button>
      </template>
    </Form>
  </div>
</template>

<script>
import Table from '@/components/MyTableComponent/Table.vue'
import Form from '@/components/MyDialogComponent/Form.vue'

export default {
  name: 'Wallet',
  components: {
    Table,
    Form
  },
  data() {
    return {
      dialogData: {
        title: '',
        dialogVisible: false,
        template: 'footerDialog'
      },
      formList: [
        { type: 'text', label: 'Name', field: 'name' },
        { type: 'text', label: 'Address', field: 'address' },
        { type: 'number', label: 'Balance', field: 'balance' },
        { type: 'number', label: 'Required Confirmations', field: 'numConfirmationsRequired' },
        { template: 'owners' }
      ],
      columns: [
        { name: 'Name', field: 'name' },
        { name: 'Address', field: 'address' },
        { name: 'Balance', field: 'balance' },
        { name: 'Required Confirmations', field: 'numConfirmationsRequired', template: 'required' },
        { name: 'Action', template: 'action' }
      ],
      columnOwner: [
        { name: 'Name', field: 'name', template: 'input' },
        { name: 'Address', field: 'address', template: 'input' },
        { name: 'Action', template: 'action' }
      ],
      wallets: [
        {
          name: 'Hust Wallet',
          address: 'f8ef8939fccccccdfr483yfe89fhdfhdfhdofhdosfhoidhfodshf3dchdi',
          balance: '0.1000000',
          numConfirmationsRequired: '2'
        }
      ],
      wallet: {
        name: '',
        address: '',
        balance: '',
        numConfirmationsRequired: '',
        owners: [{
          name: '',
          address: ''
        }]
      },
      owner: {
        name: '',
        address: ''
      }
    }
  },
  methods: {
    handleAdd() {
      this.dialogData = {
        title: 'Add',
        dialogVisible: true,
        template: 'footerDialog'
      }
    },
    handleCancel() {
      this.dialogVisible = false
    },
    handleAddSubmit() {
      this.wallets.push(this.wallet)
    },
    deposit(columnData) {
      console.log(columnData)
    },
    duplicate(columnData) {
    }
  }
}
</script>

<style lang="scss" scoped>
$--color-text: rgb(255, 255, 255);
$--color-border-light: #303033;
$--space-3: 24px;
.app-container {

  .owner-header {
    display: flex;
    justify-content: space-between;
  }

  .modal-container {
    .modal {
      background-color: rgba(99, 102, 105, 0.75);
      .form-container {
        color: $--color-text;
      }
    }
    .dialog-footer {
      display: flex;
      justify-content: space-between;
    }
  }
  .btn {
    outline: 0px;
    border: 0px rgb(18, 255, 128);
    margin: 0px;
    vertical-align: middle;
    min-width: 64px;
    color: rgba(0, 0, 0, 0.87);
    background-color: rgb(18, 255, 128);
    box-shadow: rgb(161 163 167) 0px 0px 2px;
    border-radius: 6px;
    font-weight: bold;
    line-height: 1.25;
    font-size: 14px;
    padding: 8px 24px;
    &:hover {
      text-decoration: none;
      background-color: rgb(12, 178, 89);
    }
  }
  .btn-danger {
    color: #e4e8ef;
    background-color: rgb(198, 32, 35);
    &:hover {
      background-color: rgba(198, 32, 35, 0.6);
    }
  }
  .btn-normal {
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;
    outline: 0px;
    min-width: 64px;
    border-radius: 6px;
    font-weight: bold;
    line-height: 1.25;
    text-transform: none;
    font-size: 16px;
    padding: 12px 24px;
    border: 0px rgb(18, 255, 128);
    &:hover {
      text-decoration: none;
      background-color: rgba(255, 255, 255, 0.08);
    }
  }
  .btn-size {
    padding: 8px 24px;
    min-width: 64px;
    border: 1px solid #303033;
    border-radius: 6px;
    font-weight: bold;
    line-height: 1.25;
    font-size: 14px;
  }

  .deposit-btn {
    color: #79797e;
  }

  .btn-edit {
    background-color: rgb(72, 169, 166);
    &:hover {
      background-color: rgba(72, 169, 166, 0.6);
    }
  }
 .feature-container {
  display: flex;
  margin: 0px 24px;
  justify-content: space-between;
  align-items: baseline;
    .feature-header {
      color: rgb(255, 255, 255);
      font-weight: 700;
      margin: 0px;
      font-size: 24px;
      line-height: 30px;
      margin-bottom: 24px;
    }
    .feature-item > button{
      color: rgb(18, 255, 128);
      display: flex;
      height: 100%;
      align-items: flex-end;
      -webkit-box-pack: end;
      justify-content: flex-end;
      box-sizing: border-box;
      color: rgba(0, 0, 0, 0.87);
      background-color: rgb(18, 255, 128);
      box-shadow: rgb(161 163 167) 0px 0px 2px;
      border-radius: 6px;
      font-weight: bold;
      line-height: 1.25;
      text-transform: none;
      font-size: 16px;
      padding: 8px 32px;

      &:hover {
        text-decoration: none;
        background-color: rgb(12, 178, 89);
      }
    }
 }
 .action-item {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
 }
}
</style>
